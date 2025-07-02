import { IPayment } from '@app/entities/Payment';
import { IPaginatedResponse } from '@app/types/IPaginatedResponse';

import { httpClient } from '../httpClient';

import { GetAllPaymentsFn } from './@types/GetAllPaymentsFn';

export const getAll: GetAllPaymentsFn = async (
  customerId,
  { dateRange, page = 1, perPage = 20, order = 'desc' },
) => {
  const { data } = await httpClient.get<IPaginatedResponse<IPayment[]>>(
    `/payments/${customerId}`,
    {
      params: {
        page,
        perPage,
        order,
        from: dateRange?.from,
        to: dateRange?.to,
      },
    },
  );

  return data;
};
