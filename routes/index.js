const express = require('express');
const UsersController = require('../controllers/UsersController');

const routes = express.Router();

routes.post('/users', UsersController.postNew);
routes.post('/users/login', UsersController.loginUser);
routes.get('/users/:userId', AuthController.verifyToken, UsersController.getUserProfile);
routes.put('/users/:userId', AuthController.verifyToken, UsersController.putUser);
routes.delete('/users/:userId', AuthController.verifyToken, UsersController.deleteUser);

module.exports = routes;
