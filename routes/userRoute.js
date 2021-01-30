const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//Index all user route
router.get('/', userController.user_details);

// create user
router.post('/create', userController.user_create);

router.post('/singIn', userController.user_login);



module.exports = router;