import { httpClient } from '../httpClient';

export interface RemoveProductParams {
  id: string;
}

export async function remove(params: RemoveProductParams) {
  await httpClient.delete(`/products/${params.id}`);
}
