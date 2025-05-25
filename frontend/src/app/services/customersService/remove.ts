import { httpClient } from '../httpClient';

import { RemoveCustomerFn } from './@types/RemoveCustomerFn';

export const remove: RemoveCustomerFn = async (customerId) => {
  await httpClient.delete(`/customers/${customerId}`);
};
