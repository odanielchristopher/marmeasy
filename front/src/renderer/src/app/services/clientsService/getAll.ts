import { Client } from '@renderer/app/entities/Client';
import { httpClient } from '../httpClient';

type ClientsResponse = Array<Client>;

export async function getAll() {
  const { data } = await httpClient.get<ClientsResponse>('/clients');

  return data;
}
