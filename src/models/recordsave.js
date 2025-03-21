// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

// // Maintenance Record Schema
// const MaintenanceRecordSchema = new mongoose.Schema({
//   vehicleId: String,
//   date: Date,
//   odometer: Number,
//   replacements: Object,
// });

// const MaintenanceRecord = mongoose.model('MaintenanceRecord', MaintenanceRecordSchema);

// POST Endpoint to Save Maintenance Record
// app.post('/api/maintenance', async (req, res) => {
//   try {
//     const { user_id, vehicle_id, date, odometer, engine_oil, transmission_oil, airfilter } = req.body;

//     const newRecord = new MaintenanceRecord({
//       user_id,
//       vehicle_id,
//       date,
//       odometer,
//       engine_oil,
//       transmission_oil,
//       airfilter
//     });

//     await newRecord.save();
//     res.status(201).json({ message: 'Record saved successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Error saving record' });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
