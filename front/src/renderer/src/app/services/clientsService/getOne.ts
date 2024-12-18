import { Client } from '@renderer/app/entities/Client';
import { httpClient } from '../httpClient';

export interface GetOneParams {
  id: string;
}

export type GetOneResponse = Client;

export async function getOne({ id }: GetOneParams) {
  const { data } = await httpClient.get<GetOneResponse>(`/clients/${id}`);

  return data;
}
