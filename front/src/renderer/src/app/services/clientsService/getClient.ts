import { Client } from '@renderer/app/entities/Client';
import { httpClient } from '../httpClient';

export interface GetClientParams {
  id: string;
}

export type GetClientResponse = Client;

export async function getAll({ id }: GetClientParams) {
  const { data } = await httpClient.get<GetClientResponse>(`/clients/${id}`);

  return data;
}
