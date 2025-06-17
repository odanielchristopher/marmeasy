import { IOrder } from '@app/entities/Order';
import { IPaginatedResponse } from '@app/types/IPaginatedResponse';

import { httpClient } from '../httpClient';

import { GetAllOrdersFn } from './@types/GetAllOrdersFn';

export const getAll: GetAllOrdersFn = async ({
  page = 1,
  perPage = 20,
  order = 'asc',
  search,
}) => {
  const path = search ? `/orders/search` : '/orders';

  const { data } = await httpClient.get<IPaginatedResponse<IOrder[]>>(path, {
    params: {
      page,
      perPage,
      order,
      searchTerm: search,
    },
  });

  return data;
};
