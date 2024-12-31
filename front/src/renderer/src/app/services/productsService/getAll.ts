import { Product } from '@renderer/app/entities/Product';
import { httpClient } from '../httpClient';

export type GetAllResponse = Array<Product>;

export async function getAll() {
  const { data } = await httpClient.get<GetAllResponse>('/products');

  return data;
}
