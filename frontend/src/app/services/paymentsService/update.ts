import { IPayment } from '@app/entities/Payment';

import { httpClient } from '../httpClient';

import { UpdatePaymentFn } from './@types/UpdatePaymentFn';

export const update: UpdatePaymentFn = async ({ id, ...params }) => {
  const { data } = await httpClient.put<IPayment>(`/payments/${id}`, params);

  return data;
};
