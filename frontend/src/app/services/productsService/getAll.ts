import { IProduct } from '@app/entities/Product';

import { httpClient } from '../httpClient';

import { GetAllProductsFn } from './@types/GetAllProductsFn';

export const getAll: GetAllProductsFn = async (params) => {
  const { data } = await httpClient.get<IProduct[]>('/products', {
    params,
  });

  return data;
};
