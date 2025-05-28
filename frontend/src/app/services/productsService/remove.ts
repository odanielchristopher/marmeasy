import { httpClient } from '../httpClient';

import { RemoveProductFn } from './@types/RemoveProductFn';

export const remove: RemoveProductFn = async (id) => {
  await httpClient.delete(`/products/${id}`);
};
