import { ICustomer } from '@app/entities/Customer';

import { httpClient } from '../httpClient';

import { CreateCustomerFn } from './@types/CreateCustomerFn';

export const create: CreateCustomerFn = async (params) => {
  const { data } = await httpClient.post<ICustomer>('/customers', params);

  return data;
};
