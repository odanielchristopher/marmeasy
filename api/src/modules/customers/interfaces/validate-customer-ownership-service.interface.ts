import { Customer } from '../entities/customer.entity';

export const IValidateCustomerOwnershipService = Symbol(
  'IValidateCustomerOwnershipService',
);

export interface IValidateCustomerOwnershipService {
  validate(userId: string, customerId: string): Promise<Customer>;
}
