const mongoose = require('mongoose');

const engineOilSchema = new mongoose.Schema({
  grade: { type: String, required: true },
  brand: { type: String, required: true },
  name: { type: String, required: true },
  volume: { type: Number, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true},
}, { collection: 'Engine Oils' });

module.exports = mongoose.model('EngineOil', engineOilSchema);