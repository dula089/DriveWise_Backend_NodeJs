const mongoose = require('mongoose');

const MaintenanceRecordSchema = new mongoose.Schema({
 // user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vehicle_id: { type: mongoose.Schema.Types.ObjectId, ref: 'userVehicle', required: true },
  date: { type: Date, required: true},
  odometer: { type: Number, required: true},
  engine_oil:{type: mongoose.Schema.Types.ObjectId, ref: 'EngineOil', required: true},
  transmission_oil:{type: mongoose.Schema.Types.ObjectId, ref: 'TransmissionOil', required: true},
  airfilters:{type: mongoose.Schema.Types.ObjectId, ref: 'AirFilter', required: true}

}, { collection: 'Service Records' });

module.exports = mongoose.model('ServiceRecords', MaintenanceRecordSchema);