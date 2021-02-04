const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  menu: {
    type: String,
  },
});

module.exports = mongoose.model("Item", itemSchema);