import { Order } from '@renderer/app/entities/Order';
import { httpClient } from '../httpClient';
import { PaginatedResponse } from '../types';

export async function getAll(clientId: string, pageParam = 1, perPage = 5) {
  const { data } = await httpClient.get<PaginatedResponse<Order[]>>('/orders', {
    params: {
      clientId,
      pageParam,
      perPage,
     },

  });

  return data;
}
