import { CreateOrderDto } from '../dto/create-order';
import { Order } from '../entities/order.entity';

export const IOrdersService = Symbol('IOrdersService');

export interface IOrdersService {
  create(userId: string, createOrderDto: CreateOrderDto): Promise<Order>;
}
