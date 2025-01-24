import { Client } from '@renderer/app/entities/Client';
import { httpClient } from '../httpClient';

export interface UpdateClientParams {
  id: string;
  name: string;
  type: 'FISICO' | 'JURIDICO';
  phone?: string;
  address?: string;
  document?: string;
  balance?: number | string;
}

export async function update({ id, ...params }: UpdateClientParams) {
  const { data } = await httpClient.put<Client>(`/clients/${id}`, params);

  return data;
}
