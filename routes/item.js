const express = require('express');
const router = express.Router();
const {requireLogin } = require('../middlewares/auth') ;
const { getItems } = require('../controllers/item');



//Index all user route
router.get('/getItem', requireLogin, getItems);







module.exports = router;