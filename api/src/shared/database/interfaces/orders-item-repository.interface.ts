import { OrderItem } from 'src/modules/order-items/entities/order-item.entity';

export const IOrderItemsRepository = Symbol('IOrderItemsRepository');

export interface IOrderItemsRepository {
  findManyByOrderId(
    findManyByOrderDto: FindManyByOrderIdDto,
  ): Promise<OrderItem[]>;

  findUniqueByUserId(
    findUniqueDto: FindUniqueOrderItemByIdDto,
  ): Promise<OrderItem>;
  create(createDto: CreateOrderItemDto): Promise<OrderItem>;
  update(updateDto: UpdateOrderItemDto): Promise<OrderItem>;
  delete(deleteDto: DeleteOrderItemDto): Promise<void>;
}

export type FindManyByUserIdDto = {
  userId: string;
  order: 'asc' | 'desc';
};

export type FindManyByOrderIdDto = {
  userId: string;
  orderId: string;
  order: 'asc' | 'desc';
};

export type FindUniqueOrderItemByIdDto = {
  userId: string;
  id: string;
};

export type CreateOrderItemDto = {
  data: OrderItem | Omit<OrderItem, 'id'>;
  userId: string;
};

export type UpdateOrderItemDto = {
  userId: string;
  data: OrderItem | Omit<OrderItem, 'orderId'>;
};

export type DeleteOrderItemDto = {
  userId: string;
  id: string;
};
