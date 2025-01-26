import { Order } from '../entities/order.entity';

export const IValidateOrderOwnershipService = Symbol(
  'IValidateOrderOwnershipService',
);

export interface IValidateOrderOwnershipService {
  validate(userId: string, orderId: string): Promise<Order>;
}
