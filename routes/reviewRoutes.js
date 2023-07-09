const express = require('express');
const reviewController = require('../controllers/reviewController');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

// POST /reviews/create
router.post('/create', AuthController.verifyUser, reviewController.createReview);

// GET /reviews/:id
router.get('/:id', reviewController.getReviews);

module.exports = router;
