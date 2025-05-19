import { Injectable } from '@nestjs/common';
import { IOrdersService } from '../interfaces/orders-service.interface';
import { CreateOrderDto } from '../dto/create-order';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService implements IOrdersService {
  constructor() {}

  async create(userId: string, createOrderDto: CreateOrderDto): Promise<Order> {
    return null;
  }
}
