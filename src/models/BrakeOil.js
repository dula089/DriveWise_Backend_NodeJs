const mongoose = require('mongoose');

const BrakeOilSchema = new mongoose.Schema({
  prod_id: { type: String, required: true },
  brand: { type: String, required: true },
  name: { type: String, required: true },
  volume: { type: Number, required: true },
  price: { type: Number, required: true },
}, { collection: 'Brake Oils' });

module.exports = mongoose.model('BrakeOil', BrakeOilSchema);