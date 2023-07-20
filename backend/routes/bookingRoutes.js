import express from 'express';
import bookingController from '../controllers/bookingController.js';
import AuthController from '../controllers/AuthController.js';

const router = express.Router();

// Create a new booking
router.post('/book', bookingController.createBooking);
router.delete('/:id', AuthController.verifyUser, bookingController.cancelBooking);
router.get('/history', bookingController.getUserBookingHistory);

export default router;
