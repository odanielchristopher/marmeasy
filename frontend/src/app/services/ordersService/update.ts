import { IOrder } from '@app/entities/Order';

import { httpClient } from '../httpClient';

import { UpdateOrderFn } from './@types/UpdateOrderFn';

export const update: UpdateOrderFn = async ({ id, ...params }) => {
  const { data } = await httpClient.put<IOrder>(`/orders/${id}`, params);

  return data;
};
