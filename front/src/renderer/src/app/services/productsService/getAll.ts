import { Product } from '@renderer/app/entities/Product';
import { httpClient } from '../httpClient';

export type GetAllResponse = Array<Product>;

export interface GetAllParams {
  category?: string;
}

export async function getAll({ category }: GetAllParams = {}) {
  const { data } = await httpClient.get<GetAllResponse>('/products', {
    params: { category },
  });

  return data;
}
