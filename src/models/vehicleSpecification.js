const mongoose = require('mongoose');

const vehicleSpecificationSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  engineType: { type: String, required: true },
  specifications: {
    engineOil: String,
    transmissionOil: String,
    coolant: String,
    oilFilter: String,
    fuelFilter: String
  }
});

module.exports = mongoose.model('VehicleSpecification', vehicleSpecificationSchema);
