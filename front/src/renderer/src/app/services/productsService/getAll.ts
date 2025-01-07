import { Product } from '@renderer/app/entities/Product';
import { httpClient } from '../httpClient';

export type GetAllResponse = Array<Product>;

export interface GetAllParams {
  category?: string;
}

export async function getAll(params?: GetAllParams) {
  const url = params?.category ? `/products?category=${params.category}` : '/products';

  const { data } = await httpClient.get<GetAllResponse>(url);

  return data;
}
