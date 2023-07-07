const express = require('express');
const UsersController = require('../controllers/UsersController');
const { 
  updateAccommodation,
  deleteAccommodation,
  createAccommodation,
  searchAccommodations,
} = require('../controllers/accommodationController');

const routes = express.Router();

routes.post('/users', UsersController.postNew);
routes.post('/users/login', UsersController.loginUser);
routes.get('/users/:id', AuthController.verifyToken, UsersController.getUserProfile);
routes.put('/users/:id', AuthController.verifyToken, UsersController.putUser);
routes.delete('/users/:id', AuthController.verifyToken, UsersController.deleteUser);
routes.put('/accommodations/:id', AuthController.verifyToken, updateAccommodation);
routes.delete('/accommodations/:id', AuthController.verifyToken, deleteAccommodation);
routes.get('/accommodations', searchAccommodations);
routes.post('/accommodations/:city_id/accommodations', AuthController.verifyToken, createAccommodation);
module.exports = routes;
