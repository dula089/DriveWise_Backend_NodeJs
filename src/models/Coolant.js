const mongoose = require('mongoose');

const   coolantSchema = new mongoose.Schema({
  grade: { type: String, required: true },
  brand: { type: String, required: true },
  name: { type: String, required: true },
  volume: { type: Number, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true},
}, { collection: 'Coolant' });

module.exports = mongoose.model('Coolant', coolantSchema);