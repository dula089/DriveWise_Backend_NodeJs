const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  product_id: { type: String, required: true, unique: true },
  brand: { type: String, required: true }, 
  // product_name: { type: String, required: true }, 
  // price: { type: Number, required: true } 
}, { collection: 'Brands' });

module.exports = mongoose.model('Brand', brandSchema);
