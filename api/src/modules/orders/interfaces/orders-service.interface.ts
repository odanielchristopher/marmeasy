import { CustomerType } from 'src/modules/customers/entities/customer.entity';
import { DateRangeDto } from 'src/shared/dto/date-range.dto';
import { IPaginatedResponse } from 'src/shared/types';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { Order, OrderType } from '../entities/order.entity';

export const IOrdersService = Symbol('IOrdersService');

export type OrderFilters = {
  order: string;
  page: number;
  perPage: number;
  customerType?: CustomerType;
  orderType?: OrderType;
  searchTerm?: string;
  dateRange?: DateRangeDto;
};

export interface IOrdersService {
  findAllByUserId(
    userId: string,
    filters: OrderFilters,
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
