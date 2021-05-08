const express = require('express');
const router = express.Router();

const { signup, login, logout, signup, updateUser, deleteUser }  = require('../controllers/user');
const {requireLogin } = require('../middlewares/auth') ;


//Index all user route
router.get('/user',getUsers);
router.put('/:id', updateUser);
router.delete(':/id', deleteUser) ;

// user route
router.post('/register', signup);
router.post('/login',login);
router.post('/logout' ,logout);

module.exports = router;