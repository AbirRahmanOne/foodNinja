const express = require('express');
const router = express.Router();

const { signup, login, logout, getUsers, updateUser, deleteUser }  = require('../controllers/user');
const { authenticate } = require('../middlewares/auth')


//Index all user route
router.get('/user', getUsers);
router.put('/:id', authenticate, updateUser);
router.delete('/:id', authenticate, deleteUser) ;



// user route
router.post('/register', signup);
router.post('/login', login);
router.post('/logout', authenticate, logout);

module.exports = router;