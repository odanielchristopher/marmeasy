import { Order } from '@renderer/app/entities/Order';
import { httpClient } from '../httpClient';

export interface GetAllOrdersParams {
  clientId: string;
}

export async function getAllByClientId({ clientId }: GetAllOrdersParams) {
  const { data } = await httpClient.get<Order[]>('/orders', {
    params: { clientId },
  });

  return data;
}
