const express = require('express');
const router = express.Router();
const {authenticate } = require('../middlewares/auth') ;
const { getItems } = require('../controllers/item');



//Index all user route
router.get('/getItem', authenticate, getItems);







module.exports = router;