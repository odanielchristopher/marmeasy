import { ICustomer } from '@app/entities/Customer';

import { httpClient } from '../httpClient';

type GetAllCustomersResponse = ICustomer[];

export async function getAll() {
  const { data } = await httpClient.get<GetAllCustomersResponse>('/customers');

  return data;
}
