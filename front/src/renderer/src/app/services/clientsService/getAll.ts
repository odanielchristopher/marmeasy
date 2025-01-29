import { Client } from '@renderer/app/entities/Client';
import { httpClient } from '../httpClient';
import { PaginatedResponse } from '../types';

export async function getAll(page = 1, perPage = 5) {
  const { data } = await httpClient.get<PaginatedResponse<Client[]>>(
    '/clients',
    {
      params: {
        _page: page,
        _per_page: perPage,
      },
    },
  );

  return data;
}
