import { Client } from '@renderer/app/entities/Client';
import axios from 'axios';

export type GetAllResponse = Array<Client>;

const httpClient = axios.create({
  baseURL: 'http://localhost:3001',
});

export async function getAll() {
  const { data } = await httpClient.get<GetAllResponse>('/clients', {
    params: {
      _page: 1,
      _per_page: 10,
    },
  });

  return data;
}
