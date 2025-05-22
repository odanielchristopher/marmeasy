import {
  IOrdersRepository,
  CreateOrderOnDbDto,
} from '../interfaces/orders-repository.interface';

import { Order } from 'src/modules/orders/entities/order.entity';

import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderRepository implements IOrdersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createOrderDto: CreateOrderOnDbDto): Promise<Order> {
    const { data } = createOrderDto;

    const newOrder = await this.prismaService.order.create({
      data: {
        ...data,
        orderItems: {
          createMany: {
            data:
              data.items.map((orderItem) => ({
                productId: orderItem.productId,
                quantity: orderItem.quantity,
                unitPrice: orderItem.unitPrice,
              })) || [],
          },
        },
      },
      include: {
        orderItems: true,
      },
    });

    // Map Prisma result to Order entity
    const order: Order = {
      id: newOrder.id,
      customerId: newOrder.customerId,
      userId: (data as any).userId, // Adjust this if userId is stored elsewhere
      date:
        newOrder.date instanceof Date
          ? newOrder.date.toISOString()
          : String(newOrder.date), // Ensure 'date' is a string
      type: newOrder.type as Order['type'],
      amount: newOrder.amount.toNumber(),
      items: newOrder.orderItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice:
          typeof item.unitPrice === 'object' &&
          typeof item.unitPrice.toNumber === 'function'
            ? item.unitPrice.toNumber()
            : Number(item.unitPrice),
      })),
    };

    return order;
  }
}
