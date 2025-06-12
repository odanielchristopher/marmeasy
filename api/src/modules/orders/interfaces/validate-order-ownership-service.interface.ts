import { Order } from '../entities/order.entity';

export const IValidateOrderOwnershipService = Symbol(
  'IValidateOrderOwnershipService',
);

export interface IValidateOrderOwnershipService {
  validate({
    orderId,
    userId,
  }: {
    orderId: string;
    userId: string;
  }): Promise<Order>;
}
