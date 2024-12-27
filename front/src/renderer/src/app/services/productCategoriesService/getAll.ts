import { ProductCategory } from '@renderer/app/entities/ProductCategory';
import { httpClient } from '../httpClient';

export type GetAllResponse = Array<ProductCategory>;

export async function getAll() {
  const { data } = await httpClient.get<GetAllResponse>('/product-categories');

  return data;
}
