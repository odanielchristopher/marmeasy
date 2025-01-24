import { Order } from '@renderer/app/entities/Order';
import { httpClient } from '../httpClient';

export type createItem = {
  name: string;
  unitPrice: number;
  quantity: number;
  total: number;
};

export interface CreateOrderParams {
  clientId: string;
  date: Date;
  items: createItem[];
  discount: number;
  totalValue: number;
}

export async function createByClientId(params: CreateOrderParams) {
  const { data } = await httpClient.post<Order>('/products', params);

  return data;
}
