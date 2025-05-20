import { IProduct } from '@app/entities/Product';

import { httpClient } from '../httpClient';

import { GetAllProductsFn } from './@types/GetAllProductsFn';

export const getAll: GetAllProductsFn = async () => {
  const { data } = await httpClient.get<IProduct[]>('/products');

  return data;
};
