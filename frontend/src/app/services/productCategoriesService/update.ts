import { httpClient } from '../httpClient';

import { UpdateProductCategoryFn } from './@types/UpdateProductCategoryFn';

export const update: UpdateProductCategoryFn = async ({ id, ...params }) => {
  const { data } = await httpClient.put(`/product-categories/${id}`, params);

  return data;
};
