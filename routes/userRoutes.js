const express = require('express');
const UsersController = require('../controllers/UsersController');

const userRoutes = express.Router();

userRoutes.post('/signUp', UsersController.postNew);
userRoutes.post('/login', UsersController.loginUser);
userRoutes.get('/:id', AuthController.verifyToken, UsersController.getUserProfile);
userRoutes.get('/count', AuthController.verifyToken, UsersController.countUser);
userRoutes.put('/:id', AuthController.verifyToken, UsersController.putUser);
userRoutes.delete('/:id', AuthController.verifyToken, UsersController.deleteUser);

module.exports = userRoutes;
