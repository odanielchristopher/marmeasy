import { httpClient } from '../httpClient';

export interface RemoveOrderParams {
  id: string;
}

export async function removeByClientId(params: RemoveOrderParams) {
  await httpClient.delete(`/orders/${params.id}`);
}
