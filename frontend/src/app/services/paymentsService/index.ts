import { IPaymentsService } from './@types/IPaymentsService';
import { create } from './create';
import { getAll } from './getAll';

export const paymentsService: IPaymentsService = {
  getAll,
  create,
};
