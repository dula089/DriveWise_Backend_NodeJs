const mongoose = require('mongoose');

const transmissionOilSchema = new mongoose.Schema({
  prod_id: { type: String, required: true },
  brand: { type: String, required: true },
  name: { type: String, required: true },
  volume: { type: Number, required: true },
  price: { type: Number, required: true },
}, { collection: 'Transmission Oils' });

module.exports = mongoose.model('TransmissionOil', transmissionOilSchema);