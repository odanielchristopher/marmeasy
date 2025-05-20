import { IProductCategory } from '@app/entities/ProductCategories';

import { httpClient } from '../httpClient';

import { GetAllProductCategoriesFn } from './@types/GetAllProductCategoriesFn';

export const getAll: GetAllProductCategoriesFn = async () => {
  const { data } = await httpClient.get<IProductCategory[]>(
    '/product-categories',
  );

  return data;
};
