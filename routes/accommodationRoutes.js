const express = require('express');
const router = express.Router();
const accommodationController = require('../controllers/accommodationController');


router.post('/create', accommodationController.createAccommodation);
router.put('/:id', accommodationController.updateAccommodation);
router.delete('/:id', accommodationController.deleteAccommodation);

module.exports = router;
