import { Order } from '@renderer/app/entities/Order';
import { httpClient } from '../httpClient';
import { PaginatedResponse } from '../types';

export interface GetBySearchTermParams {
  page?: number;
  perPage?: number;
  searchTerm: string;
  dateRange?: { from?: string; to?: string; }
}

export async function getBySearchTerm({
  page = 1,
  perPage = 20,
  searchTerm,
  dateRange,
}: GetBySearchTermParams) {
  const { data } = await httpClient.get<PaginatedResponse<Order[]>>(
    '/orders/search',
    {
      params: {
        page,
        perPage,
        query: searchTerm,
        from: dateRange?.from,
        to: dateRange?.to,
      },
    },
  );

  return data;
}
