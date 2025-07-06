import { ICustomer } from '@app/entities/Customer';

import { httpClient } from '../httpClient';

import { GetOneCustomerFn } from './@types/GetOneCustomerFn';

export const getOne: GetOneCustomerFn = async (customerId) => {
  const { data } = await httpClient.get<ICustomer>(`/customers/${customerId}`);

  return data;
};
