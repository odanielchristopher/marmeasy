import { IOrder } from '@app/entities/Order';

import { httpClient } from '../httpClient';

import { GetOneOrderFn } from './@types/GetOneOrderFn';

export const getOne: GetOneOrderFn = async (orderId) => {
  const { data } = await httpClient.get<IOrder>(`/orders/${orderId}`);

  return data;
};
