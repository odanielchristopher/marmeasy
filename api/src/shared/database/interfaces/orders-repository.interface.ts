import { Order } from 'src/modules/orders/entities/order.entity';
import { CreateOrderDto } from 'src/modules/orders/dto/create-order.dto';

export const IOrdersRepository = Symbol('IOrdersRepository');

export interface IOrdersRepository {
  create(createOrderDto: CreateOrderOnDbDto): Promise<Order>;

  findFirstById(findFirstByIdDto: FindFirstByIdDto): Promise<Order>;
  findManyByCustomerId(
    findManyByCustomerIdDto: FindManyByCustomerIdDto,
  ): Promise<Order[]>;
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
