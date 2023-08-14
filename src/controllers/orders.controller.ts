import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import ordersService from '../services/orders.service';

async function getOrdes(_req: Request, res: Response): Promise<Response> {
  const serviceResponse = await ordersService.getOrders();
  return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
}

export default {
  getOrdes,
};