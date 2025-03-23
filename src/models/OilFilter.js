const mongoose = require('mongoose');

const oilFilterSchema = new mongoose.Schema({
  prod_id: { type: String, required: true },
  brand: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
}, { collection: 'Oil Filters' });

module.exports = mongoose.model('OilFilter', oilFilterSchema);