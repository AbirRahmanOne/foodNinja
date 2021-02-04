const express = require("express");
const { createOrder, getOrderItems } = require("../controllers/order");
const { requireLogin } = require("../middlewares/auth");
const router = express.Router();

router.post("/createOrder" ,createOrder);
//router.get("/getOrder", requireLogin, getOrderItems);
module.exports = router;