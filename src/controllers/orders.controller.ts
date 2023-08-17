import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import ordersService from '../services/orders.service';

async function getOrdes(_req: Request, res: Response): Promise<Response> {
  const serviceResponse = await ordersService.getOrders();
  return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
}

async function create(req: Request, res: Response): Promise<Response> {
  const { productIds, userId } = req.body;
  const serviceResponse = await ordersService.create({ productIds, userId });
  
  return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
}

export default {
  getOrdes,
  create,
};