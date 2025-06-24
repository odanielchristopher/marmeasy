import { httpClient } from '../httpClient';

import { RemoveOrderFn } from './@types/RemoveOrderFn';

export const remove: RemoveOrderFn = async (orderId) => {
  await httpClient.delete(`/orders/${orderId}`);
};
