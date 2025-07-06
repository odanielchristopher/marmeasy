import { ICustomer } from '@app/entities/Customer';

import { httpClient } from '../httpClient';

import { GetAllCustomersBySearchFn } from './@types/GetAllCustomersBySearchFn';

export const getAllBySearch: GetAllCustomersBySearchFn = async (search) => {
  const { data } = await httpClient.get<ICustomer[]>('/customers/search', {
    params: {
      searchTerm: search,
    },
  });

  return data;
};
