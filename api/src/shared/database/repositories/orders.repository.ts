import {
  IOrdersRepository,
  CreateOrderOnDbDto,
} from '../interfaces/orders-repository.interface';

import { Order, OrderType } from 'src/modules/orders/entities/order.entity';

import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderRepository implements IOrdersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createOrderDto: CreateOrderOnDbDto): Promise<Order> {
    const { data } = createOrderDto;

    const newOrder = await this.prismaService.order.create({
      data: {
        customerId: data.customerId,
        type: data.type,
        date: data.date,
        amount: data.amount,
        orderItems: {
          createMany: {
            data: createOrderDto.data.items,
          },
        },
      },
      include: {
        orderItems: true,
      },
    });

    const { orderItems, ...rest } = newOrder;

    const order: Order = {
      ...rest,
      type: newOrder.type as OrderType,
      amount: newOrder.amount.toNumber(),
      items: orderItems.map((item) => ({
        ...item,
        unitPrice: item.unitPrice.toNumber(),
      })),
    };

    return order;
  }
}
