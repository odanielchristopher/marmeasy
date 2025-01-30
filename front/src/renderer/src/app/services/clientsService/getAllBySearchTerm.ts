import { Client } from '@renderer/app/entities/Client';
import { httpClient } from '../httpClient';
import { PaginatedResponse } from '../types';

interface GetBySearchTermParams {
  page?: number;
  perPage?: number;
  searchTerm: string;
}

export async function getBySearchTerm({ page, perPage, searchTerm }: GetBySearchTermParams) {
  const { data } = await httpClient.post<PaginatedResponse<Client[]>>(
    '/clients',
    {
      data: {
        query: searchTerm,
      },
      params: {
        page: page || 1,
        perPage: perPage || 10,
      },
    },
  );

  return data;
}
