const express = require('express');


const Vehicle = require('../models/Vehicle');
const Brand = require('../models/Brand');
const EO = require('../models/EngineOil');
const TO = require('../models/TransmissionOil');
const AirFilter = require('../models/AirFilter');
const UserVehicle = require('../models/UserVehicle');

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
    const user = await User.findById(userId);
    user.vehicle_ids.push(newUserVehicle._id);
    await user.save();
  
    res.status(201).json({ message: 'Vehicle added successfully', vehicleId: vehicle._id });
});
  

// Route: Get User's Vehicles
router.get('/userVehicles/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId).populate('vehicle_ids');
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.json(user.vehicle_ids);
});

// Route: Get Brands
router.get('/brands', async (req, res) => {
  const brands = await Brand.find();
  res.json(brands);
});

module.exports = router;
