const express = require("express");
const { createOrder, getOrderItems } = require("../controllers/order");
const { authenticate } = require("../middlewares/auth");
const router = express.Router();

router.post("/createOrder" ,createOrder);
//router.get("/getOrder", authenticate, getOrderItems);
module.exports = router;