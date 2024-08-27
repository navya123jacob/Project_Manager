import { Router } from 'express';
import { AuthController } from '../../adapter/AuthController';
import { verifyJWT } from '../middleware/AuthMiddleware';

const AuthRoutes = Router();
const authController = new AuthController();

AuthRoutes.post('/register', authController.register.bind(authController));

AuthRoutes.post('/login', authController.login.bind(authController));

AuthRoutes.put('/update-user', verifyJWT, authController.updateUser.bind(authController));


export default AuthRoutes;
