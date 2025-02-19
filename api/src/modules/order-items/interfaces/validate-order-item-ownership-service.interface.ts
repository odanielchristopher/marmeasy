import { OrderItem } from '../entities/order-item.entity';

export const IValidateOrderItemsOwnershipService = Symbol(
  'ValidateOrderItemsOwnershipService',
);

export interface IValidateOrderItemsOwnershipService {
  validate(userId: string, orderItemId: string): Promise<void | OrderItem>;
}
