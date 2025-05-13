import { ICustomer } from '@app/entities/Customer';

import { httpClient } from '../httpClient';

type GetOneCustomerResponse = ICustomer;

export async function getOne(customerId: string) {
  const { data } = await httpClient.get<GetOneCustomerResponse>(
    `/customers/${customerId}`,
  );

  return data;
}
