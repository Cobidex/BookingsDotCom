import express from 'express';
import reviewController from '../controllers/reviewController.js';
import AuthController from '../controllers/AuthController.js';

const router = express.Router();

// POST /reviews/create
router.post('/create', AuthController.verifyUser, reviewController.createReview);

// GET /reviews/:id
router.get('/:id', reviewController.getReviews);

export default router;
