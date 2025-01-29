import { Client } from '@renderer/app/entities/Client';
import delay from '@renderer/app/utils/delay';
import axios from 'axios';
import { PaginatedResponse } from '../types';

const httpClient = axios.create({
  baseURL: 'http://localhost:3001',
});

httpClient.interceptors.response.use(async (data) => {
  await delay(1500);

  return data;
});

export async function getAll(page = 1, perPage = 5) {
  const { data } = await httpClient.get<PaginatedResponse<Client[]>>('/clients', {
    params: {
      _page: page,
      _per_page: perPage,
    },
  });

  return data;
}
