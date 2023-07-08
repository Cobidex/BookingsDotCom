const express = require('express');
const {
    getCities,
    createCity,
    updateCity,
    deleteCity,
} = require('../controllers/cityController');

const router = express.Router();

// GET /cities
router.get('/', getCities);

// POST /cities
router.post('/', createCity);

// PUT /cities/:id
router.put('/:id', updateCity);

// DELETE /cities/:id
router.delete('/:id', deleteCity);

module.exports = router;
