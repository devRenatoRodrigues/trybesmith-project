import { Router } from 'express';
import ordersController from '../controllers/orders.controller';
import validateNewOrder from '../middlewares/validateNewOrderInputs.middleware';
import userExists from '../middlewares/userExists.middleware';
import authMiddleware from '../middlewares/auth.middleware';

const oderRouter = Router();

oderRouter.get('/orders', ordersController.getOrdes);

oderRouter.post(
  '/orders',
  authMiddleware,
  userExists,
  validateNewOrder,
  ordersController.create,
);

export default oderRouter;