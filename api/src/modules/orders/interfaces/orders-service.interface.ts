import { DateRangeDto } from 'src/shared/dto/date-range.dto';
import { SearchTermDto } from 'src/shared/dto/search-term.dto';
import { IPaginatedResponse } from 'src/shared/types';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { Order } from '../entities/order.entity';

export const IOrdersService = Symbol('IOrdersService');

export interface IOrdersService {
  findAllByClientId(userId: string, clientId: string): Promise<Order[]>;

  findAllBySearchTerm(
    findAllBySearchTerm: FindAllBySearchTermDto,
  ): Promise<IPaginatedResponse<Order[]>>;

  findAllUserId(
    findAllByUserId: FindAllByUserIdDto,
  ): Promise<IPaginatedResponse<Order[]>>;

  create(userId: string, createOrderDto: CreateOrderDto): Promise<Order>;

  update(
    userId: string,
    orderId: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order>;

  delete(
    userId: string,
    orderId: string,
  ): Promise<{
    message: string;
  }>;
}

export type FindAllByUserIdDto = {
  userId: string;
  dateRange?: DateRangeDto;
  page?: number;
  perPage?: number;
};

export type FindAllBySearchTermDto = FindAllByUserIdDto & {
  searchTerm: SearchTermDto;
};
