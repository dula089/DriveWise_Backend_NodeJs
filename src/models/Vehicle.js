const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  vehicle_id: { type: String, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  engine_type: { type: String, required: true },
  year: { type: Number, required: true },
  engine_oil: { type: String, required: true},
  transmission_oil: { type: String, required: true},
  brake_oil: { type: String, required: true},
  oil_filter: { type: String, required: true},
  coolant: { type: String, required : true},
  imageUrl: { type: String, required: true},
}, { collection: 'Vehicles' });

module.exports = mongoose.model('Vehicle', vehicleSchema);
