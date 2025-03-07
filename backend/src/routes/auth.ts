import express from 'express';
import AuthController from '../controllers/AuthController.ts';
import { validateLogin, validateRegister } from '../middlewares/authMiddleware.ts';

const route = express.Router();

route.post('/register', AuthController.register);
route.post('/login', AuthController.login);

export default route;