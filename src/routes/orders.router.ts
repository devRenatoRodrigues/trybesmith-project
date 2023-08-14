import { Router } from 'express';
import ordersController from '../controllers/orders.controller';

const oderRouter = Router();

oderRouter.get('/orders', ordersController.getOrdes);

export default oderRouter;