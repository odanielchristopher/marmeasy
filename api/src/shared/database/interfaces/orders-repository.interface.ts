import { Order } from 'src/modules/orders/entities/order.entity';

export const IOrdersRepository = Symbol('IOrdersRepository');

export interface IOrdersRepository {
  findManyByClientId(
    findManyByClientIdDto: FindManyByClientIdDto,
  ): Promise<Order[]>;

  findFirstByClientId(
    findFirstByClientIdDto: FindFirstOrderByClientIdDto,
  ): Promise<Order>;

  findUniqueByUserId(findUniqueDto: FindUniqueOrderByIdDto): Promise<Order>;

  create(createDto: CreateOrderDto): Promise<Order>;

  update(updateDto: UpdateOrderDto): Promise<Order>;

  delete(deleteDto: DeleteOrderItemDto): Promise<Order | void>;
}

export type FindManyByClientIdDto = {
  userId: string;
  clientId: string;
  order: 'asc' | 'desc';
};

export type FindUniqueOrderByIdDto = {
  userId: string;
  id: string;
};

export type FindFirstOrderByClientIdDto = {
  userId: string;
  clientId: string;
  id: string;
};

export type CreateOrderDto = {
  data: Order | Omit<Order, 'id'>;
  userId: string;
};

export type UpdateOrderDto = {
  userId: string;
  data: Order | Omit<Order, 'orderId'>;
};

export type DeleteOrderItemDto = {
  userId: string;
  id: string;
};
