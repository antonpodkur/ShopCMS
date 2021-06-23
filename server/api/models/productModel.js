const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number, 
    required: true,
  },
  description: {
    type: String,
  },
  img: {
    type: String,
  },
});

const model = mongoose.model('Products', ProductSchema);

module.exports = model;
