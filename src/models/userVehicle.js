const mongoose = require('mongoose');

const userVehicleSchema = new mongoose.Schema({
  // vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true }, // Foreign key to Vehicle model
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  registration_number: { type: String, required: true },
  current_odometer_reading: { type: Number, required: true },
  next_service_reading: { type: Number, required: true },
  license_expiry_date: { type: Date, required: true },
  preferred_brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true }
}, { collection: 'Owned Vehicles' });

module.exports = mongoose.model('UserVehicle', userVehicleSchema);