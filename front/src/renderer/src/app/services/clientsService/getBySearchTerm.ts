import { Client } from '@renderer/app/entities/Client';
import { httpClient } from '../httpClient';
import { PaginatedResponse } from '../types';

export interface GetBySearchTermParams {
  page?: number;
  perPage?: number;
  searchTerm: string;
}

export async function getBySearchTerm({
  page = 1,
  perPage = 20,
  searchTerm,
}: GetBySearchTermParams) {
  const { data } = await httpClient.post<PaginatedResponse<Client[]>>(
    '/clients/search',
    {
      query: searchTerm,
    },
    {
      params: {
        page,
        perPage,
      },
    },
  );

  return data;
}
