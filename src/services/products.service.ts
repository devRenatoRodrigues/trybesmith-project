import ProductModel from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

function validateParams({
  name,
  price,
  orderId,
}: Product): string | null {
  if (!name) return 'Title is required';
  if (!price) return 'Description is required';
  if (!orderId) return 'Url is required';
  return null;
}

async function create(product: Product): Promise<ServiceResponse<Product>> {
  let responseService: ServiceResponse<Product>;
  const error = validateParams(product);
  if (error) {
    responseService = { status: 'INVALID_DATA', data: { message: error } };
    return responseService;
  }
  const newProduct = await ProductModel.create(product);
  const { orderId, ...rest } = newProduct.dataValues;
  responseService = { status: 'SUCCESSFUL', data: rest };
  return responseService;
}

async function getProduct(): Promise<ServiceResponse<Product[]>> {
  const products = await ProductModel.findAll();
  const productArray: Product[] = products.map((productModel) => productModel.toJSON());
  const responseService: ServiceResponse<Product[]> = { status: 'SUCCESSFUL', data: productArray };
  return responseService;
}

export default {
  create,
  getProduct,
};