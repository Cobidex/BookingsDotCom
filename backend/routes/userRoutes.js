import express from 'express';
import UsersController from '../controllers/UsersController.js';
import AuthController from '../controllers/AuthController.js';

const userRoutes = express.Router();

userRoutes.post('/signup', UsersController.signUp);
userRoutes.get('/signin', UsersController.signIn);
userRoutes.get('/profile', AuthController.verifyUser, UsersController.getUserProfile);
userRoutes.get('/count', AuthController.verifyAdmin, UsersController.getUserCount);
userRoutes.put('/profile', AuthController.verifyUser, UsersController.editUserProfile);
userRoutes.delete('/delete', AuthController.verifyUser, UsersController.deleteUser);

export default userRoutes;
