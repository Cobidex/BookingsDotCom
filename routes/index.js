const express = require('express');
const UsersController = require('../controllers/UsersController');

const routes = express.Router();

routes.post('/users', UsersController.postNew);
routes.post('/users/login', UsersController.loginUser);
routes.get('/users/:id/dashboard', AuthController.verifyToken, UsersController.getProfile);

module.exports = routes;
