const express = require("express");
const { create, getOrderItems } = require("../controllers/order");
const { requireLogin } = require("../middlewares/auth");
const router = express.Router();

router.post("/createOrder", requireLogin ,create);
router.get("/getOrder", requireLogin, getOrderItems);
module.exports = router;