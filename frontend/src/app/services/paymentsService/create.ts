import { IPayment } from '@app/entities/Payment';

import { httpClient } from '../httpClient';

import { CreatePaymentFn } from './@types/CreatePaymentFn';

export const create: CreatePaymentFn = async (params) => {
  const { data } = await httpClient.post<IPayment>('/payments', params);

  return data;
};
