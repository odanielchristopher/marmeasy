import { httpClient } from '../httpClient';

import { RemoveProductCategoryFn } from './@types/RemoveProductCategoryFn';

export const remove: RemoveProductCategoryFn = async (id) => {
  await httpClient.delete(`/product-categories/${id}`);
};
