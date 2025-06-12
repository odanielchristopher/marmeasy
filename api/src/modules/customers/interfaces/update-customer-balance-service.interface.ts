import { Customer } from '../entities/customer.entity';

export const IUpdateCustomerBalanceService = Symbol(
  'IUpdateCustomerBalanceService',
);

export type OperationType = 'CREDIT' | 'DEBIT';

export type UpdateBalanceParams = {
  userId: string;
  customerId: string;
  previousValue?: number;
  newValue: number;
  operationType: OperationType;
};

export interface IUpdateCustomerBalanceService {
  update(params: UpdateBalanceParams): Promise<Customer>;
}
