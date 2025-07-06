import { ICustomer } from '@app/entities/Customer';
import { IPaginatedResponse } from '@app/types/IPaginatedResponse';

import { httpClient } from '../httpClient';

import { GetAllCustomersFn } from './@types/GetAllCustomersFn';

export const getAll: GetAllCustomersFn = async ({
  page = 1,
  perPage = 20,
  filters,
}) => {
  const { data } = await httpClient.get<IPaginatedResponse<ICustomer[]>>(
    '/customers',
    {
      params: {
        page,
        perPage,
        type:
          filters?.customerType !== 'ALL' ? filters?.customerType : undefined,
        order: filters?.order,
      },
    },
  );

  return data;
};
