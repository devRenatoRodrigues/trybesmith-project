import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { GetAllOrders } from '../types/Order';
import { ServiceResponse } from '../types/ServiceResponse';

async function getOrders(): Promise<ServiceResponse<GetAllOrders[]>> {
  const orders = await OrderModel.findAll({
    include: [{
      model: ProductModel,
      as: 'productIds',
      attributes: ['id'],
    }],
  });
  
  const orderArray: GetAllOrders[] = orders.map(({ dataValues }) => {
    const productIds = dataValues.productIds?.map(({ id }) => id);
    return { 
      id: dataValues.id,
      userId: dataValues.userId,
      productIds,
    };
  });
  
  return { 
    status: 'SUCCESSFUL', data: orderArray };
}

export default {
  getOrders,
};