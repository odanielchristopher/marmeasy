import { IPaymentsService } from './@types/IPaymentsService';
import { create } from './create';
import { getAll } from './getAll';
import { remove } from './remove';
import { update } from './update';

export const paymentsService: IPaymentsService = {
  getAll,
  create,
  update,
  remove,
};
