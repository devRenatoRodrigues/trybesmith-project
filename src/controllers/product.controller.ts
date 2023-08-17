import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import productsService from '../services/products.service';

async function create(req: Request, res: Response): Promise<Response> {
  const { name, price, orderId } = req.body;
  const serviceResponse = await productsService.create({ name, price, orderId,
  });
  return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
}

async function getProduct(_req: Request, res: Response): Promise<Response> {
  const serviceResponse = await productsService.getProduct();
  return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
}

export default {
  create,
  getProduct,
};