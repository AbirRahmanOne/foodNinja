const express = require("express");
const { create, getOrderItems } = require("../controllers/order");
const { requireLogin } = require("../middlewares/auth");
const router = express.Router();

router.post("/createOrder",  create);
router.get("/getOrder",  getOrderItems);
module.exports = router;