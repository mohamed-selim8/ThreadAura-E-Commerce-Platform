const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// schema for product
const productSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  image: {
    type: Array,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  subCategory: {
    type: String,
    required: false,
  },
  size: {
    type: Array,
    required: false,
  },
  bestSeller: {
    type: Boolean,
    required: false,
  },
  date: {
    type: Date,
    required: false,
  },
});

const Product = model("Product", productSchema);

module.exports = Product;
