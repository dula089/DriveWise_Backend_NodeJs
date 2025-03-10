const mongoose = require('mongoose');

const airFilterSchema = new mongoose.Schema({
  prod_id: { type: String, required: true },
  brand: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
}, { collection: 'Air Filters' });

module.exports = mongoose.model('AirFilter', airFilterSchema);