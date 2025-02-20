import { Order } from '@renderer/app/entities/Order';
import { httpClient } from '../httpClient';

export type UpdateItem = {
  name: string;
  ingredients: string[];
  unitPrice: number;
  quantity: number;
  total: number;
};

export interface UpdatedOrderParams {
  id: string;
  clientId: string;
  date: Date;
  items: UpdateItem[];
  discount: number;
  totalValue: number;
}

export async function update(params: UpdatedOrderParams) {
  const { data } = await httpClient.put<Order>(`/orders/${params.id}`, params);

  return data;
}
