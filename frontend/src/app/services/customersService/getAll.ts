import { ICustomer } from '@app/entities/Customer';
import { IPaginatedResponse } from '@app/types/IPaginatedResponse';

import { httpClient } from '../httpClient';

export type GetAllCustomersParams = {
  page?: number;
  perPage?: number;
};

export async function getAll({
  page = 1,
  perPage = 20,
}: GetAllCustomersParams) {
  const { data } = await httpClient.get<IPaginatedResponse<ICustomer[]>>(
    '/customers',
    {
      params: {
        _page: page,
        _per_page: perPage,
      },
    },
  );

  return data;
}
