import { NextFunction, Request, Response } from 'express';
import newProductSchema from './schemas/createProductSchema';
import mapStatusHTTP from '../utils/mapStatusHTTP';

const validateNewProduct = (req:Request, res: Response, next:NextFunction) => {
  const inputs = req.body;
  const { error } = newProductSchema.validate(inputs);  
  if (error) {
    const [status, message] = error.message.split('|');
    return res.status(mapStatusHTTP(status)).json({ message });
  }
  return next();
};

export default validateNewProduct;