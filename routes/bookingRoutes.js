const express = require('express');
const bookingController = require('../controllers/bookingController');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

// Create a new booking
router.post('/book', AuthController.verifyUser, bookingController.createBooking);
router.delete('/:id', AuthController.verifyUser, bookingController.cancelBooking);

module.exports = router;
