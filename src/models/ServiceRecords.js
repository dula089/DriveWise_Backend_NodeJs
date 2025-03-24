const mongoose = require('mongoose');
// const userVehicle = require('./userVehicle');

const MaintenanceRecordSchema = new mongoose.Schema({
 // user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
 vehicle_id: { type: mongoose.Schema.Types.ObjectId, ref: 'userVehicle', required: true },
 date: { type: Date, required: true},
 odometer: { type: mongoose.Schema.Types.Double, required: true},
 engine_oil:{type: String, required: true},
 transmission_oil:{type: String, required: true},
 airfilters:{type: String, required: true},
 brakeoil: { type: String, required: true },

  // vehicle_id: { type: mongoose.Schema.Types.String, ref: 'userVehicle', required: true },
  // date: { type: Date, required: true},
  // odometer: { type: Number, required: true},
  // engine_oil:{type: mongoose.Schema.Types.ObjectId, ref: 'EngineOil', required: true},
  // transmission_oil:{type: mongoose.Schema.Types.ObjectId, ref: 'TransmissionOil', required: true},
  // airfilters:{type: mongoose.Schema.Types.ObjectId, ref: 'AirFilter', required: true},
  // brakeoil: { type: mongoose.Schema.Types.ObjectId, ref: 'BrakeOil', required: true },

}, { collection: 'Service Records' });

module.exports = mongoose.model('ServiceRecords', MaintenanceRecordSchema);