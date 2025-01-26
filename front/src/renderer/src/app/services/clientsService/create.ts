import { Client } from '@renderer/app/entities/Client';
import { httpClient } from '../httpClient';

export interface CreateClientParams {
  name: string;
  type: 'FISICO' | 'JURIDICO';
  phone?: string;
  address?: string;
  document?: string;
  initalBalance: number | string;
}

export async function create(params: CreateClientParams) {
  console.log({ params });
  const { data } = await httpClient.post<Client>('/clients', params);

  return data;
}
