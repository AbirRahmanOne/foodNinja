const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    orderItems: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        quantity: {
          type: Number,
          default: 0,
        },
        price: {
          type: Number,
          required: true,
        },
        menu: {
          type:String, 
          required: true,
        },
      },
    ],
  }
);

module.exports = mongoose.model("Order", orderSchema);