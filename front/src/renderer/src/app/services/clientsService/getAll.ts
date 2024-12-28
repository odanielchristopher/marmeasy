import { Client } from '@renderer/app/entities/Client';
import { httpClient } from '../httpClient';

export type GetAllResponse = Array<Client>;

export async function getAll() {
  const { data } = await httpClient.get<GetAllResponse>('/clients');

  return data;
}
