import {
  IOrdersRepository,
  CreateOrderOnDbDto,
  FindFirstByIdDto,
  FindManyByCustomerIdDto,
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

  async findFirstById(
    findFirstByIdDto: FindFirstByIdDto,
  ): Promise<Order | null> {
    const { customerId, orderId } = findFirstByIdDto;

    const foundOrder = await this.prismaService.order.findFirst({
      where: {
        id: orderId,
        customerId,
      },
      include: {
        orderItems: {
          select: {
            productId: true,
            quantity: true,
            unitPrice: true,
            product: {
              select: {
                name: true,
                imagePath: true,
              },
            },
          },
        },
      },
    });

    if (!foundOrder) {
      return null;
    }

    const { orderItems, ...rest } = foundOrder;

    const order: Order = {
      ...rest,
      type: foundOrder.type as OrderType,
      amount: foundOrder.amount.toNumber(),
      items: orderItems.map((item) => ({
        ...item,
        unitPrice: item.unitPrice.toNumber(),
      })),
    };

    return order;
  }

  async findManyByCustomerId(
    findManyByCustomerIdDto: FindManyByCustomerIdDto,
  ): Promise<Order[]> {
    const { customerId, order, page, perPage } = findManyByCustomerIdDto;

    const skip = (page - 1) * perPage;

    return await this.prismaService.order
      .findMany({
        where: { customerId },
        orderBy: { date: order },
        take: perPage,
        skip,
        include: {
          orderItems: {
            select: {
              productId: true,
              quantity: true,
              unitPrice: true,
              product: {
                select: {
                  name: true,
                  imagePath: true,
                },
              },
            },
          },
        },
      })
      .then((orders) =>
        orders.map((order) => ({
          ...order,
          type: order.type as OrderType,
          amount: order.amount.toNumber(),
          items: order.orderItems.map((item) => ({
            ...item,
            unitPrice: item.unitPrice.toNumber(),
          })),
        })),
      );
  }

  async delete(orderId: string, customerId): Promise<void> {
    await this.prismaService.order.delete({
      where: {
        id: orderId,
        customerId: customerId,
      },
    });
  }
}
