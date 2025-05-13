import { ICustomer } from '@app/entities/Customer';

import { httpClient } from '../httpClient';

export async function getAllBySearch(search?: string) {
  const { data } = await httpClient.get<ICustomer[]>('/customers/search', {
    params: {
      searchTerm: search,
    },
  });

  return data;
}
