import { Router } from 'express';
import loginController from '../controllers/login.controller';

const loginRouter = Router();

loginRouter.get('/login', loginController.login);

export default loginRouter;