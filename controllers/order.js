const Order = require("../models/order");
const { response } = require("express");

const createOrder = function (req, res) {

  try {

    const order = new Order({
      user: req.body.user_id,
      orderItems: [req.body.orderItems],
    });
    
    order.save((error, order) => {
      console.log(error);
      if (error) return res.status(400).json({ error });
      if (order) {
        return res.status(201).json({ order });
      }
    });


  } catch (err){
    res.status(500);
    res.json( {errors: err})
  }
    
};

const getOrderItems = (req, res) => {

  Order.findOne({ user: req.user._id })

    .exec((error, order) => {
      if (error) return res.status(400).json({ error });
      if (order) {
        let orderItems = {};
        order.orderItems.forEach(( curItem, index) => {
          orderItems[curItem.item._id.toString()] = {
            _id: curItem.item._id.toString(),
            qty: curItem.quantity,
          };
        });
        res.status(200).json({ orderItems });
      }
    });
  //}
};

module.exports = {
  createOrder,
  getOrderItems,


}