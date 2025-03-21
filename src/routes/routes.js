// routes.js

const express = require('express');


const Vehicle = require('../models/Vehicle');
const Brand = require('../models/Brand');
const EO = require('../models/EngineOil');
const TO = require('../models/TransmissionOil');
const AirFilter = require('../models/AirFilter');
const UserVehicle = require('../models/UserVehicle');
const User = require('../models/user');
const ServiceRecords = require('../models/ServiceRecords')

const router = express.Router();

router.get('/makes', async (req, res) => {
  try {
    const makes = await Vehicle.distinct('make');
    console.log("Fetched makes:", makes); // just for Debugging
    res.json(makes);
  } catch (error) {
    console.error("Error fetching makes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route: Get Models for a selected Make
router.get('/models/:make', async (req, res) => {
  const models = await Vehicle.distinct('model', { make: req.params.make });
  res.json(models);
});

// Route: Get Engine Types for a selected Model
router.get('/engines/:make/:model', async (req, res) => {
  const engines = await Vehicle.distinct('engine_type', { make: req.params.make, model: req.params.model });
  res.json(engines);
});

// Route: Get Years for a selected Make, Model, and Engine Type
router.get('/years/:make/:model/:engine', async (req, res) => {
  const years = await Vehicle.distinct('year', {
    make: req.params.make,
    model: req.params.model,
    engine_type: req.params.engine
  });
  res.json(years);
});

// Route: Add Vehicle to User (Link vehicle to user)
router.post('/addVehicle', async (req, res) => {
    const { userId, make, model, engine_type, year, registration_number, odometer_reading, next_service_reading, license_expiry_date, preferred_brand_id } = req.body;
  
    // Find the vehicle that matches the make, model, engine_type, and year in the Vehicle collection
    const vehicle = await Vehicle.findOne({ make, model, engine_type, year });
  
    if (!vehicle) {
      return res.status(404).json({ message: 'Selected vehicle is not available in our system.' });
    }
  
    // Create a new UserVehicle entry linking the user to the existing vehicle
    const newUserVehicle = new UserVehicle({
      // vehicle: vehicle.vehicle_id,
      vehicle: vehicle._id, 
      user_id: userId,
      registration_number,
      current_odometer_reading: odometer_reading,
      next_service_reading: next_service_reading,
      license_expiry_date: license_expiry_date,
      preferred_brand: preferred_brand_id
    });
  
    await newUserVehicle.save();
  
    // Add the new UserVehicle to the user's vehicle_ids array
    // const user = await User.findById(userId);
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // user.vehicle_ids.push(vehicle.vehicle_id);
    user.vehicle_ids.push(vehicle._id);
    await user.save();
  
    res.status(201).json({ message: 'Vehicle added successfully', vehicleId: vehicle.vehicle_id });
});
  

// Route: Get User's Vehicles
router.get('/userVehicles/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId).populate('vehicle_ids');
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.json(user.vehicle_ids);
});

// Route: Get All Vehicles (or vehicles for a specific user)
router.get('/vehicles/:userId', async (req, res) => {
  try {
    // Fetch the user's vehicle IDs from the User collection
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch the user's vehicles from the UserVehicle collection
    const userVehicles = await UserVehicle.find({ user_id: req.params.userId }).populate('vehicle');

    // Map the data to match the Flutter frontend's expected structure
    const formattedVehicles = userVehicles.map((userVehicle) => {
      const vehicle = userVehicle.vehicle;
      return {
        id: vehicle._id,
        nickname: `${vehicle.make} ${vehicle.model}`, // Add a default nickname if not provided
        imageUrl: 'https://static.carfromjapan.com/spec_8102021a-ee22-42ce-af9b-1c5b998f44ba_640_0', // Add a default image if not provided
        registrationNumber: userVehicle.registration_number, // From UserVehicle
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year,
        currentMileage: userVehicle.current_odometer_reading, // From UserVehicle
        nextService: userVehicle.next_service_reading,
        licenseDateExpiry: userVehicle.license_expiry_date, // From UserVehicle
        insuranceDateExpiry: userVehicle.license_expiry_date, // Add a default date if not provided
        specifications: {
          'Engine Oil': vehicle.engine_oil,
          'Transmission Oil': vehicle.transmission_oil,
          'Air Filter': vehicle.air_filter,
        },
      };
    });

    // Generate upcoming events for all vehicles
    const upcomingEvents = userVehicles.flatMap((userVehicle) => {
      const vehicle = userVehicle.vehicle;
      const events = [];

      // Add license expiry event
      if (userVehicle.license_expiry_date) {
        events.push({
          type: 'License Expiry',
          date: userVehicle.license_expiry_date,
          vehicle: `${vehicle.make} ${vehicle.model}`,
          urgency: userVehicle.license_expiry_date, // Use date for sorting
        });
      }

      // Add insurance expiry event
      if (userVehicle.insurance_expiry_date) {
        events.push({
          type: 'Insurance Expiry',
          date: userVehicle.insurance_expiry_date,
          vehicle: `${vehicle.make} ${vehicle.model}`,
          urgency: userVehicle.insurance_expiry_date, // Use date for sorting
        });
      }

      // Add next service event (based on mileage)
      if (userVehicle.next_service_reading && userVehicle.current_odometer_reading) {
        const mileageDifference = userVehicle.next_service_reading - userVehicle.current_odometer_reading;
        events.push({
          type: 'Service Due',
          date: null, // No date, only mileage
          mileageDifference: mileageDifference,
          vehicle: `${vehicle.make} ${vehicle.model}`,
          urgency: mileageDifference, // Use mileage difference for sorting
        });
      }

      return events;
    });

    // Sort events by urgency (earliest date or lowest mileage difference)
    upcomingEvents.sort((a, b) => {
      if (a.date && b.date) {
        return a.date - b.date; // Sort by date
      } else if (a.mileageDifference && b.mileageDifference) {
        return a.mileageDifference - b.mileageDifference; // Sort by mileage difference
      } else {
        return 0;
      }
    });

    // res.json(formattedVehicles);
    res.json({
      vehicles: formattedVehicles,
      upcomingEvents: upcomingEvents,
    });
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// router.get('/vehicles/:userId', async (req, res) => {
//   try {
//     // Fetch the user's vehicle IDs from the User collection
//     const user = await User.findById(req.params.userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Fetch the vehicle details for each vehicle ID
//     const vehicles = await Vehicle.find({ _id: { $in: user.vehicle_ids } });
//     // const vehicles = await Vehicle.find({ vehicle_id: { $in: user.vehicle_ids } });

//     // Map the data to match the Flutter frontend's expected structure
//     const formattedVehicles = vehicles.map((vehicle) => ({
//       id: vehicle.vehicle_id,
//       nickname: `${vehicle.make} ${vehicle.model}`, // Add a default nickname if not provided
//       imageUrl: 'https://via.placeholder.com/150', // Add a default image if not provided
//       registrationNumber: vehicle.registration_number,
//       make: vehicle.make,
//       model: vehicle.model,
//       year: vehicle.year,
//       currentMileage: vehicle.current_odometer_reading,
//       licenseDateExpiry: vehicle.license_expiry_date,
//       insuranceDateExpiry: vehicle.license_expiry_date, // Add a default date if not provided
//       specifications: {
//         'Engine Oil': vehicle.engine_oil,
//         'Transmission Oil': vehicle.transmission_oil,
//         'Air Filter': vehicle.air_filter,
//       },
//     }));

//     res.json(formattedVehicles);
//   } catch (error) {
//     console.error('Error fetching vehicles:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// Route: Get Brands
router.get('/brands', async (req, res) => {
  const brands = await Brand.find();
  res.json(brands);
});


// Route: Update Vehicle Mileage
router.put('/updateMileage', async (req, res) => {
  const { userId, vehicleId, mileage } = req.body;
  try {
    const userVehicle = await UserVehicle.findOne({
      user_id: userId,
      vehicle: vehicleId,
    });

    if (!userVehicle) {
      return res.status(404).json({ message: 'Vehicle not found for this user' });
    }

    userVehicle.current_odometer_reading = mileage;
    await userVehicle.save();
    res.status(200).json({ message: 'Mileage updated successfully' });
  } catch (error) {
    console.error('Error updating mileage:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// router.put('/updateMileage', async (req, res) => {
//   const { vehicleId, mileage } = req.body;

//   try {
//     const userVehicle = await UserVehicle.findOne({ vehicle: vehicleId });
//     if (!userVehicle) {
//       return res.status(404).json({ message: 'Vehicle not found' });
//     }

//     userVehicle.current_odometer_reading = mileage;
//     await userVehicle.save();

//     res.status(200).json({ message: 'Mileage updated successfully' });
//   } catch (error) {
//     console.error('Error updating mileage:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

router.post('/maintenance', async (req, res) => {
  try {
    const { user_id, vehicle_id, date, odometer, engine_oil, transmission_oil, airfilters } = req.body;

    const newRecord = new ServiceRecords({
      user_id: user_id,
      vehicle_id: vehicle_id,
      date: date,
      odometer: odometer,
      engine_oil: engine_oil,
      transmission_oil: transmission_oil,
      airfilters: airfilters
    });

    await newRecord.save();
    res.status(201).json({ message: 'Record saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving record' });
  }
});

module.exports = router;
