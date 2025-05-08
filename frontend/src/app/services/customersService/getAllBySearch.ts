import { ICustomer } from '@app/entities/Customer';

import { httpClient } from '../httpClient';

export async function getAllBySearch(search?: string) {
  const { data } = await httpClient.get<ICustomer[]>('/customers', {
    params: {
      name_like: search,
    },
  });

  return data;
}
