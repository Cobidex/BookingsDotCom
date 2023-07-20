import express from 'express';
import bookingController from '../controllers/bookingController.js';
import AuthController from '../controllers/AuthController.js';

const router = express.Router();

// Create a new booking
router.post('/book', AuthController.verifyUser, bookingController.createBooking);
router.delete('/:id', AuthController.verifyUser, bookingController.cancelBooking);
router.post('/history', AuthController.verifyUser, bookingController.getUserBookingHistory);

export default router;
