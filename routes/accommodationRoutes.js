const express = require('express');
const router = express.Router();
const accommodationController = require('../controllers/accommodationController');


router.post('/create', accommodationController.createAccommodation);

module.exports = router;
