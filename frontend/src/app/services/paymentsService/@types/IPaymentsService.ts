import { CreatePaymentFn } from './CreatePaymentFn';
import { GetAllPaymentsFn } from './GetAllPaymentsFn';

export interface IPaymentsService {
  getAll: GetAllPaymentsFn;
  create: CreatePaymentFn;
}
