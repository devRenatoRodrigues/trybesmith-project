import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { GetAllOrders } from '../types/Order';
import { ServiceResponse } from '../types/ServiceResponse';

async function getOrders(): Promise<ServiceResponse<GetAllOrders[]>> {
  const orders = await OrderModel.findAll({
    include: [{
      model: ProductModel,
      as: 'productIds',
      attributes: ['id', 'name', 'price', 'orderId'],
    }],
  });
  console.log('orders', orders[0].dataValues.productIds);
  const orderArray: GetAllOrders[] = orders.map((order) => {
    const productIds = order.dataValues.productIds?.map((product) => product.id);    
    return { 
      id: order.dataValues.id,
      userId: order.dataValues.userId,
      productIds,
    };
  });
  
  return { 
    status: 'SUCCESSFUL', data: orderArray };
}

export default {
  getOrders,
};