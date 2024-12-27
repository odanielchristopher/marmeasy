import { httpClient } from '../httpClient';

export interface CreateProductCategoryParams {
  icon: string;
  name: string;
}

export async function create(params: CreateProductCategoryParams) {
  const { data } = await httpClient.post('/product-categories', params);

  return data;
}
