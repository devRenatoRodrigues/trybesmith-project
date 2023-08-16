import { Router } from 'express';
import loginController from '../controllers/login.controller';
import loginMiddleware from '../middlewares/login.middleware';

const loginRouter = Router();

loginRouter.post('/login', loginMiddleware, loginController.login);

export default loginRouter;