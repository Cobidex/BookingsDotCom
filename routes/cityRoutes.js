import express from 'express';
import cityController from '../controllers/cityController.js';
import AuthController from '../controllers/AuthController.js';

const router = express.Router();

// GET /cities
router.get('/', AuthController.verifyAdmin, cityController.getCities);

// POST /cities
router.post('/', AuthController.verifyAdmin, cityController.createCity);

// PUT /cities/:id
router.put('/:id', AuthController.verifyAdmin, cityController.updateCity);

// DELETE /cities/:id
router.delete('/:id', AuthController.verifyAdmin, cityController.deleteCity);

export default router;
