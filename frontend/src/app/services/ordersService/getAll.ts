import { IOrder } from '@app/entities/Order';
import { IPaginatedResponse } from '@app/types/IPaginatedResponse';

import { httpClient } from '../httpClient';

import { GetAllOrdersFn } from './@types/GetAllOrdersFn';

export const getAll: GetAllOrdersFn = async ({
  page = 1,
  perPage = 20,
  order = 'asc',
  search,
  customerType,
  orderType,
  customerId,
  dateRange,
}) => {
  const path = customerId ? `/orders/customer/${customerId}` : '/orders';

  const { data } = await httpClient.get<IPaginatedResponse<IOrder[]>>(path, {
    params: {
      page,
      perPage,
      order,
      searchTerm: search,
      customerType,
      orderType,
      from: dateRange?.from,
      to: dateRange?.to,
    },
  });

  return data;
};
