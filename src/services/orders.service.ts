import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { CreateNewOrder, GetAllOrders } from '../types/Order';
import { ServiceResponse } from '../types/ServiceResponse';

async function getOrders(): Promise<ServiceResponse<GetAllOrders[]>> {
  const orders = await OrderModel.findAll({
    include: [{
      model: ProductModel,
      as: 'productIds',
      attributes: ['id'],
    }],
  });
  const orderArray: GetAllOrders[] = orders.map((order) => ({ 
    id: order.dataValues.id,
    userId: order.dataValues.userId,
    productIds: order.dataValues.productIds?.map((product) => product.id) || [],
  }));
  
  return { 
    status: 'SUCCESSFUL', data: orderArray };
}

async function create(newOrder: CreateNewOrder)
  : Promise<ServiceResponse<CreateNewOrder>> {
  const { productIds, userId } = newOrder;
  
  const createNewOrder = await OrderModel.create({ userId });
  const { id } = createNewOrder.dataValues;

  const updatePoduct = productIds.map(async (productId) => {
    await ProductModel.update({ orderId: id }, { where: { id: productId } });
  });
  
  await Promise.all(updatePoduct);
  
  return { 
    status: 'CREATED',
    data: {
      userId,
      productIds,
    } };
}

export default {
  getOrders,
  create,
};