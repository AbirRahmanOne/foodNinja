const express = require("express");
const router = express.Router();

const { getProducts, createProducts } = require("../controllers/product");


router.post("/menu/createItem", createProducts);
router.get("/menu/getItem", getProducts);

module.exports = router;