const express = require('express');
const UsersController = require('../controllers/UsersController');

const routes = express.Router();

routes.post('/users', UsersController.postNew);
routes.post('/users/login', UsersController.loginUser);
routes.get('/users', AuthController.verifyToken, UsersController.getUserProfile);
routes.put('/users', AuthController.verifyToken, UsersController.putUser);
routes.delete('/users', AuthController.verifyToken, UsersController.deleteUser);

module.exports = routes;
