import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../entities/order.entity';

export const IOrdersService = Symbol('IOrdersService');

export interface IOrdersService {
  create(createOrderDto: CreateOrderDto): Promise<Order>;
}
