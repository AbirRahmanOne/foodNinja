const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food Item",
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
          type: mongoose.Schema.Types.ObjectId,
          ref: "Menu",
        },
      },
    ],
    total_Price: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);