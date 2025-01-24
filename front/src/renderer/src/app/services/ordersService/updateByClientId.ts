import { Order } from '@renderer/app/entities/Order';
import { httpClient } from '../httpClient';

export type createItem = {
  name: string;
  unitPrice: number;
  quantity: number;
  total: number;
};

export interface CreateOrderParams {
  id: string;
  clientId: string;
  date: Date;
  items: createItem[];
  discount: number;
  totalValue: number;
}

export async function updateByClientId(params: CreateOrderParams) {
  const { data } = await httpClient.put<Order>(`/orders/${params.id}`, params);

  return data;
}
