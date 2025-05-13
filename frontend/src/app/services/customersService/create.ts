import { CustomerType, ICustomer } from '@app/entities/Customer';

import { httpClient } from '../httpClient';

export interface ICreateCustomerParams {
  name: string;
  type: CustomerType;
  phone?: string;
  color: string;
  initialBalance: number;
}

type CreateCustomerResponse = ICustomer;

export async function create(params: ICreateCustomerParams) {
  const { data } = await httpClient.post<CreateCustomerResponse>(
    '/customers',
    params,
  );

  return data;
}
