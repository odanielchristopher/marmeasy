import { Order } from 'src/modules/orders/entities/order.entity';
import { CreateOrderDto } from 'src/modules/orders/dto/create-order.dto';
import { UpdateOrderDto } from 'src/modules/orders/dto/update-order.dto';

export const IOrdersRepository = Symbol('IOrdersRepository');

export interface IOrdersRepository {
  create(createOrderDto: CreateOrderOnDbDto): Promise<Order>;

  findFirstById(findFirstByIdDto: FindFirstByIdDto): Promise<Order>;

  findManyByCustomerId(
    findManyByCustomerIdDto: FindManyByCustomerIdDto,
  ): Promise<Order[]>;

  delete(orderId: string, customerId: string): Promise<void>;

  update(updateOrderOnDbDto: UpdateOrderOnDbDto): Promise<Order>;
}

export type CreateOrderOnDbDto = {
  data: CreateOrderDto;
};

export type FindFirstByIdDto = {
  customerId: string;
  orderId: string;
};

export type FindManyByCustomerIdDto = {
  customerId: string;
  order: 'asc' | 'desc';
  page: number;
  perPage: number;
};

export type UpdateOrderOnDbDto = {
  orderId: string;
  customerId: string;
  data: UpdateOrderDto;
};
