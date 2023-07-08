const express = require('express');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

// POST /reviews/create
router.post('/create', reviewController.createReview);

// GET /reviews/:id
router.get('/:id', reviewController.getReviews);

module.exports = router;
