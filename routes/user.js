const express = require('express');
const router = express.Router();
const { user_details, register, login, logout }  = require('../controllers/user');
const {authorizationCheck } = require('../middlewares/auth') ;
//Index all user route
router.get('/',user_details);

// user route
router.post('/register', register);
router.post('/login', login);
router.post('/logout' ,logout);





module.exports = router;