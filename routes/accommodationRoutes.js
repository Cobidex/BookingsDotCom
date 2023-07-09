const express = require('express');
const router = express.Router();
const accommodationController = require('../controllers/accommodationController');
const AuthController = require('../controllers/AuthController');


router.post('/create', AuthController.verifyAdmin, accommodationController.createAccommodation);
router.put('/:id', AuthController.verifyAdmin, accommodationController.updateAccommodation);
router.delete('/:id', AuthController.verifyAdmin, accommodationController.deleteAccommodation);
router.get('/search', accommodationController.searchAccommodations);

module.exports = router;
