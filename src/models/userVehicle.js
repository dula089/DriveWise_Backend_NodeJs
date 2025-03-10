const mongoose = require('mongoose');

const userVehicleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VehicleSpecification',
    required: true
  },
  nickname: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  currentMileage: { type: Number, required: true },
  licenseDateExpiry: { type: Date, required: true },
  insuranceDateExpiry: { type: Date, required: true }
});

module.exports = mongoose.model('UserVehicle', userVehicleSchema);
