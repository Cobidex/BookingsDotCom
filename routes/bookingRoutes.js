const express = require('express');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

// Create a new booking
router.post('/book', bookingController.createBooking);

module.exports = router;
