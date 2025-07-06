import { httpClient } from '../httpClient';

import { RemovePaymentFn } from './@types/RemovePaymentFn';

export const remove: RemovePaymentFn = async (paymentId) => {
  await httpClient.delete(`/payments/${paymentId}`);
};
