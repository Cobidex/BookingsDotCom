const express = require('express');
const UsersController = require('../controllers/UsersController');
const AuthController = require('../controllers/AuthController');

const userRoutes = express.Router();

userRoutes.post('/signup', UsersController.signUp);
userRoutes.post('/signin', UsersController.signIn);
userRoutes.get('/profile', AuthController.verifyUser, UsersController.getUserProfile);
userRoutes.get('/count', AuthController.verifyAdmin, UsersController.getUserCount);
userRoutes.put('/profile', AuthController.verifyUser, UsersController.editUserProfile);
userRoutes.delete('/delete', AuthController.verifyUser, UsersController.deleteUser);

module.exports = userRoutes;
