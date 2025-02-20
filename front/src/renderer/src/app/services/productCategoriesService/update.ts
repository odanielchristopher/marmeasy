import { httpClient } from '../httpClient';

export interface UpdateProductCategoryParams {
  id: string;
  icon: string;
  name: string;
}

export async function update({ id, ...params }: UpdateProductCategoryParams) {
  const { data } = await httpClient.put(`/product-categories/${id}`, params);

  return data;
}
