import { Order } from '@renderer/app/entities/Order';
import { httpClient } from '../httpClient';
import { PaginatedResponse } from '../types';

export type GetAllParams = {
  page?: number;
  perPage?: number;
  to?: string;
  from?: string;
}

export async function getAll({ page = 1, perPage = 20, from, to }: GetAllParams) {
  const { data } = await httpClient.get<PaginatedResponse<Order[]>>('/orders', {
    params: {
      from,
      to,
      page,
      perPage,
     },

  });

  return data;
}
