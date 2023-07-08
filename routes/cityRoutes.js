const express = require('express');
const cityController = require('../controllers/cityController');

const router = express.Router();

// GET /cities
router.get('/', cityController.getCities);

// POST /cities
router.post('/', cityController.createCity);

// PUT /cities/:id
router.put('/:id', cityController.updateCity);

// DELETE /cities/:id
router.delete('/:id', cityController.deleteCity);

module.exports = router;
