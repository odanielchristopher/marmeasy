import { httpClient } from '../httpClient';

export interface RemoveProductCategoryParams {
  id: string;
}

export async function remove(params: RemoveProductCategoryParams) {
  await httpClient.delete(`/product-categories/${params.id}`);
}
