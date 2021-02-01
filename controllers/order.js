const Order = require("../models/order");
const Product = require("../models/product");
const user = require('../models/user')
const { response } = require("express");
const { requireLogin } = require("../middlewares/auth");

exports.create = function (req, res) {
  Order.findOne({ user: req.user._id }).exec((error, order) => {
    if (error) return res.status(400).json({ error });
    if (order) {
      // if same user order 2nd time in current session

      const isProduct = order.orderItems.find(
        (cur) => cur.item == req.body.orderItems.item
      );

      if (isProduct) {
        Order.findOneAndUpdate(
          {
            user: req.user._id,
            "orderItems.item": req.body.orderItems.item,
          },
          {
            $set: {
              "orderItems.$": {
                ...req.body.orderItems,
                quantity: isProduct.quantity + req.body.orderItems.quantity,
                price: isProduct.price + req.body.orderItems.price,
              },
            },
          }
        ).exec((error, _order) => {
          if (error) return res.status(400).json({ error });
          if (_order) {
            return res.status(200).json({ order: _order });
          }
        });
      } else {
        Order.findOneAndUpdate(
          { user: req.user._id },
          {
            $push: {
              orderItems: req.body.orderItems,
            },
          }
        ).exec((error, _order) => {
          if (error) return res.status(400).json({ error });
          if (_order) {
            return res.status(200).json({ order: _order });
          }
        });
      }
    } else {
      const order = new Order({
        user: req.user._id,
        orderItems: [req.body.orderItems],
        total_Price: req.body.orderItems.price,
      });

      order.save((error, order) => {
        if (error) return res.status(400).json({ error });
        if (order) {
          return res.status(201).json({ order });
        }
      });
    }
  });
};

exports.getOrderItems = (req, res) => {
  //const { user } = req.body.payload;
  //if(user){
  Order.findOne({ user: req.user._id })
    //.populate("orderItems.item", "_id name price productPictures")
    .exec((error, order) => {
      if (error) return res.status(400).json({ error });
      if (order) {
        let orderItems = {};
        order.orderItems.forEach((i, index) => {
          orderItems[i.item._id.toString()] = {
            _id: i.item._id.toString(),
            qty: i.quantity,
          };
        });
        res.status(200).json({ orderItems });
      }
    });
  //}
};