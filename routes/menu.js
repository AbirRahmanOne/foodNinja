const express = require("express");
const { addMenu, getMenu } = require("../controllers/menu");
const router = express.Router();

router.post("/menu/add", addMenu);
router.get("/menu/getMenu", getMenu);

module.exports = router;