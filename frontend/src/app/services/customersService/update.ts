import { httpClient } from '../httpClient';

import { UpdateCustomerFn } from './@types/UpdateCustomerFn';

export const update: UpdateCustomerFn = async ({ id, ...params }) => {
  const { data } = await httpClient.put(`/customers/${id}`, {
    ...params,
    balance: params.initialBalance,
  });

  return data;
};
