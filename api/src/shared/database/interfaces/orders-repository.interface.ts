import { CreateOrderDto } from 'src/modules/orders/dto/create-order.dto';
import { UpdateOrderDto } from 'src/modules/orders/dto/update-order.dto';
import { Order } from 'src/modules/orders/entities/order.entity';
import { IPaginatedResponse } from 'src/shared/types';

export const IOrdersRepository = Symbol('IOrdersRepository');

export interface IOrdersRepository {
  findManyByUserId(
    FindManyDto: FindManyByUserIdDto,
  ): Promise<IPaginatedResponse<Order[]>>;

  findFirstById(findFirstByIdDto: FindFirstByIdDto): Promise<Order>;

  findManyByCustomerId(
    findManyByCustomerIdDto: FindManyByCustomerIdDto,
  ): Promise<IPaginatedResponse<Order[]>>;

  create(createOrderDto: CreateOrderOnDbDto): Promise<Order>;

  delete(orderId: string): Promise<Order>;

  update(updateOrderOnDbDto: UpdateOrderOnDbDto): Promise<Order>;
}

export type FindManyByUserIdDto = {
  userId: string;
  order: 'asc' | 'desc';
  page: number;
  perPage: number;
};

export type CreateOrderOnDbDto = {
  userId: string;
  data: CreateOrderDto & { amount: number };
};

export type FindFirstByIdDto = {
  userId: string;
  orderId: string;
};

export type FindManyByCustomerIdDto = {
  userId: string;
  customerId: string;
  order: 'asc' | 'desc';
  page: number;
  perPage: number;
};

export type UpdateOrderOnDbDto = {
  orderId: string;
  customerId: string;
  data: UpdateOrderDto & { amount: number };
};
