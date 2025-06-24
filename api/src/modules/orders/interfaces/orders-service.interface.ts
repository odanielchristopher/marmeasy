import { CustomerType, OrderType } from '@prisma/client';
import { IPaginatedResponse } from 'src/shared/types';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { Order } from '../entities/order.entity';

export const IOrdersService = Symbol('IOrdersService');

export interface IOrdersService {
  findAllByUserId(
    userId: string,
    filters: {
      order: string;
      page: number;
      perPage: number;
      customerType?: CustomerType;
      orderType?: OrderType;
      searchTerm?: string;
    },
  ): Promise<IPaginatedResponse<Order[]>>;

  findOneById(userId: string, orderId: string): Promise<Order>;

  findAllByCustomerId(
    userId: string,
    customerId: string,
    order: 'asc' | 'desc',
    page: number,
    perPage: number,
  ): Promise<IPaginatedResponse<Order[]>>;

  create(userId: string, createOrderDto: CreateOrderDto): Promise<Order>;

  update(
    userId: string,
    orderId: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order>;

  delete(userId: string, orderId: string): Promise<void>;
}
