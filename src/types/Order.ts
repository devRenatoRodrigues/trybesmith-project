import { Product } from './Product';

export type Order = {
  id: number;
  userId: number;
  productIds?: Product[];
};

export type GetAllOrders = {
  id: number;
  userId: number;
  productIds?: number[]
};

export type CreateNewOrder = {
  userId: number;
  productIds: number[]
};