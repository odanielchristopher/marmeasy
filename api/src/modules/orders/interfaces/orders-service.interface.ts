import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../entities/order.entity';

export const IOrdersService = Symbol('IOrdersService');

export interface IOrdersService {
  create(userId: string, createOrderDto: CreateOrderDto): Promise<Order>;
  findFirstById(
    userId: string,
    customerId: string,
    orderId: string,
  ): Promise<Order | null>;

  listAllOdersByCustomerId(
    userId: string,
    customerId: string,
    order: 'asc' | 'desc',
    page: number,
    perPage: number,
  ): Promise<Order[]>;

  delete(userId: string, customerId: string, orderId: string): Promise<void>;
}
