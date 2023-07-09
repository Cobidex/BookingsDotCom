const express = require('express');
const cityController = require('../controllers/cityController');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

// GET /cities
router.get('/', AuthController.verifyAdmin, cityController.getCities);

// POST /cities
router.post('/', AuthController.verifyAdmin, cityController.createCity);

// PUT /cities/:id
router.put('/:id', AuthController.verifyAdmin, cityController.updateCity);

// DELETE /cities/:id
router.delete('/:id', AuthController.verifyAdmin, cityController.deleteCity);

module.exports = router;
