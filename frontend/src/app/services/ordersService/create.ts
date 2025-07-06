import { IOrder } from '@app/entities/Order';

import { httpClient } from '../httpClient';

import { CreateOrderFn } from './@types/CreateOrderFn';

export const create: CreateOrderFn = async (params) => {
  const { data } = await httpClient.post<IOrder>('/orders', params);

  return data;
};
