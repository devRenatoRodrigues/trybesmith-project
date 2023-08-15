import { Router } from 'express';
import productController from '../controllers/product.controller';
import validateNewProduct from '../middlewares/validateInputValues.middleware';

const productRouter = Router();

productRouter.post('/products', validateNewProduct, productController.create);
productRouter.get('/products', productController.getProduct);

export default productRouter;