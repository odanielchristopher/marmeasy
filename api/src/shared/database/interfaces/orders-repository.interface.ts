import { Order } from 'src/modules/orders/entities/order.entity';
import { CreateOrderDto } from 'src/modules/orders/dto/create-order.dto';

export const IOrdersRepository = Symbol('IOrdersRepository');

export interface IOrdersRepository {
  create(createOrderDto: CreateOrderOnDbDto): Promise<Order>;
}

export type CreateOrderOnDbDto = {
  data: CreateOrderDto;
};
