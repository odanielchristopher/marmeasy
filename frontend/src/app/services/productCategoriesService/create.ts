import { httpClient } from '../httpClient';

import { CreateProductCategoryFn } from './@types/CreateProductCategoryFn';

export const create: CreateProductCategoryFn = async (params) => {
  const { data } = await httpClient.post('/product-categories', params);

  return data;
};
