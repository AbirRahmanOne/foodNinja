const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
  },
  createdAt: Date,
});

module.exports = mongoose.model("Product", productSchema);