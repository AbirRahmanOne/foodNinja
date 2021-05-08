const express = require('express');
const router = express.Router();

const { getUsers, signup, login, logout }  = require('../controllers/user');
const {requireLogin } = require('../middlewares/auth') ;


//Index all user route
router.get('/user',getUsers);

// user route
router.post('/register', signup);
router.post('/login',login);
router.post('/logout' ,logout);

module.exports = router;