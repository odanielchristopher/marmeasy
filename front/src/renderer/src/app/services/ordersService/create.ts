import { Order } from '@renderer/app/entities/Order';
import { httpClient } from '../httpClient';

export type CreateItem = {
  name: string;
  ingredients: string[];
  unitPrice: number;
  quantity: number;
  total: number;
};

export interface CreateOrderParams {
  clientId: string;
  date: Date;
  items: CreateItem[];
  discount: number;
  totalValue?: number;
}

export async function create(params: CreateOrderParams) {
  const { data } = await httpClient.post<Order>('/orders', params);

  return data;
}
