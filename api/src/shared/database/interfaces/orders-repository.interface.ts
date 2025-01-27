import { CreateOrderDto } from 'src/modules/orders/dto/create-order.dto';
import { UpdateOrderDto } from 'src/modules/orders/dto/update-order.dto';
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

  create(createDto: CreateOrderParams): Promise<Order>;

  update(updateDto: UpdateOrderParams): Promise<Order>;

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

export type CreateOrderParams = {
  data: CreateOrderDto;
  userId: string;
};

export type UpdateOrderParams = {
  userId: string;
  id: string;
  data: UpdateOrderDto;
};

export type DeleteOrderItemDto = {
  userId: string;
  id: string;
};
