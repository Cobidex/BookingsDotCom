import express from 'express';
const router = express.Router();
import accommodationController from '../controllers/accommodationController.js';
import AuthController from '../controllers/AuthController.js';


router.post('/create', accommodationController.createAccommodation);
router.put('/:id', AuthController.verifyAdmin, accommodationController.updateAccommodation);
router.delete('/:id', AuthController.verifyAdmin, accommodationController.deleteAccommodation);
router.post('/search', accommodationController.searchAccommodations);

export default router;
