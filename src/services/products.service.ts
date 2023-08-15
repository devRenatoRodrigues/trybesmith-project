import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

async function create(product: ProductInputtableTypes)
  : Promise<ServiceResponse<ProductInputtableTypes>> {
  const newProduct = await ProductModel.create(product);
  const { orderId, ...rest } = newProduct.dataValues;
  const responseService: 
  ServiceResponse<ProductInputtableTypes> = { status: 'CREATED', data: rest };
  return responseService;
}

async function getProduct(): Promise<ServiceResponse<Product[]>> {
  const products = await ProductModel.findAll();
  const productArray: Product[] = products.map(({ dataValues }) => dataValues);
  const responseService: ServiceResponse<Product[]> = { status: 'SUCCESSFUL', data: productArray };
  return responseService;
}

export default {
  create,
  getProduct,
};