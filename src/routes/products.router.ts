import { Router } from 'express';
import productController from '../controllers/product.controller';

const productRouter = Router();

productRouter.post('/products', productController.create);
productRouter.get('/products', productController.getProduct);

export default productRouter;