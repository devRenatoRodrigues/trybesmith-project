import { NextFunction, Request, Response } from 'express';
import newProductSchema from './schemas/createProductSchema';
import mapStatusHTTP from '../utils/mapStatusHTTP';

const validateNewProduct = (req:Request, res: Response, next:NextFunction) => {
  const { error } = newProductSchema.validate(req.body);  
  console.log(error);
  
  if (error) {
    const [status, message] = error.message.split('|');
    return res.status(mapStatusHTTP(status)).json({ message });
  }
  return next();
};

export default validateNewProduct;