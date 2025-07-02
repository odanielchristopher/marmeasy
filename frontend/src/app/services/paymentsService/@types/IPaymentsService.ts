import { CreatePaymentFn } from './CreatePaymentFn';
import { GetAllPaymentsFn } from './GetAllPaymentsFn';
import { RemovePaymentFn } from './RemovePaymentFn';
import { UpdatePaymentFn } from './UpdatePaymentFn';

export interface IPaymentsService {
  getAll: GetAllPaymentsFn;
  create: CreatePaymentFn;
  update: UpdatePaymentFn;
  remove: RemovePaymentFn;
}
