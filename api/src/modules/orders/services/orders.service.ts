import { Inject, Injectable } from '@nestjs/common';
import { IOrdersService } from '../interfaces/orders-service.interface';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../entities/order.entity';
import { IOrdersRepository } from 'src/shared/database/interfaces/orders-repository.interface';

@Injectable()
export class OrdersService implements IOrdersService {
  constructor(
    @Inject(IOrdersRepository)
    private readonly ordersRepository: IOrdersRepository,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersRepository.create({ data: createOrderDto });
  }
}
