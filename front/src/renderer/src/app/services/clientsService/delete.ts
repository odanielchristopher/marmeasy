import { Client } from '@renderer/app/entities/Client';
import { httpClient } from '../httpClient';

export interface RemoveClientParams {
  id: string;
}

export async function remove(params: RemoveClientParams) {
  await httpClient.delete<Client>(`/clients/${params.id}`);
}
