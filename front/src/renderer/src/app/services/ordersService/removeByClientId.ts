import { httpClient } from '../httpClient';

export interface RemoveProductParams {
  id: string;
}

export async function removeByClientId(params: RemoveProductParams) {
  await httpClient.delete(`/products/${params.id}`);
}
