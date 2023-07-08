const express = require('express');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

// POST /reviews
router.post('/reviews', reviewController.createReview);

// GET /reviews/:accommodationId
router.get('/reviews/:accommodationId', reviewController.getReviews);

module.exports = router;
