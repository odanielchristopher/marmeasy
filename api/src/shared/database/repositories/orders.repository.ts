import {
  CreateOrderOnDbDto,
  FindFirstByIdDto,
  FindManyByCustomerIdDto,
  FindManyByUserIdDto,
  IOrdersRepository,
  UpdateOrderOnDbDto,
} from '../interfaces/orders-repository.interface';

import { Order } from 'src/modules/orders/entities/order.entity';

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DateRangeDto } from 'src/shared/dto/date-range.dto';
import { IPaginatedResponse } from 'src/shared/types';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OrderRepository implements IOrdersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findManyByUserId(
    FindManyDto: FindManyByUserIdDto,
  ): Promise<IPaginatedResponse<Order[]>> {
    const {
      userId,
      order,
      page,
      perPage,
      customerType,
      orderType,
      searchTerm,
      dateRange,
    } = FindManyDto;

    const { from, to } = this.parseDateRange(dateRange);

    const skip = (page - 1) * perPage;

    const orders = await this.prismaService.order.findMany({
      where: {
        customer: {
          userId: userId,
          name: { contains: searchTerm, mode: 'insensitive' },
          type: customerType,
        },
        type: orderType,
        date: {
          gte: from,
          lte: to,
        },
      },
      orderBy: { date: order },
      take: perPage,
      skip,
      select: this.prismaResponse(),
    });

    const totalItems = await this.prismaService.order.count({
      where: {
        userId,
      },
    });

    return {
      data: orders as unknown as Order[],
      items: totalItems,
    };
  }

  async findFirstById(
    findFirstByIdDto: FindFirstByIdDto,
  ): Promise<Order | null> {
    const { orderId, userId } = findFirstByIdDto;

    const foundedOrder = await this.prismaService.order.findFirst({
      where: {
        id: orderId,
        userId,
      },
      select: this.prismaResponse(),
    });

    return foundedOrder as unknown as Order;
  }

  async findManyByCustomerId(
    findManyByCustomerIdDto: FindManyByCustomerIdDto,
  ): Promise<IPaginatedResponse<Order[]>> {
    const { customerId, userId, order, page, perPage } =
      findManyByCustomerIdDto;

    const skip = (page - 1) * perPage;

    const orders = await this.prismaService.order.findMany({
      where: { customerId },
      orderBy: { date: order },
      take: perPage,
      skip,
      select: this.prismaResponse(),
    });

    const totalItems = await this.prismaService.order.count({
      where: {
        userId,
        customerId,
      },
    });

    return {
      data: orders as unknown as Order[],
      items: totalItems,
    };
  }

  async create(createOrderDto: CreateOrderOnDbDto): Promise<Order> {
    const { data, userId } = createOrderDto;

    const newOrder = await this.prismaService.order.create({
      data: {
        userId,
        customerId: data.customerId,
        type: data.type,
        date: data.date,
        amount: data.amount,
        items: {
          createMany: {
            data: createOrderDto.data.items,
          },
        },
      },
      select: this.prismaResponse(),
    });

    return newOrder as unknown as Order;
  }

  async update(updateOrderOnDbDto: UpdateOrderOnDbDto): Promise<Order> {
    const { orderId, customerId, data } = updateOrderOnDbDto;

    const updatedOrder = await this.prismaService.order.update({
      where: {
        id: orderId,
        customerId: customerId,
      },
      data: {
        type: data.type,
        date: data.date,
        amount: data.amount,
        items: {
          deleteMany: {},
          createMany: {
            data: data.items,
          },
        },
      },
      select: this.prismaResponse(),
    });

    return updatedOrder as unknown as Order;
  }

  async delete(orderId: string): Promise<Order> {
    const order = await this.prismaService.order.delete({
      where: {
        id: orderId,
      },
      select: this.prismaResponse(),
    });

    return order as unknown as Order;
  }

  private parseDateRange(dateRange?: DateRangeDto) {
    const from = dateRange?.from
      ? new Date(new Date(dateRange.from).setUTCHours(0, 0, 0, 0))
      : undefined;

    const to = dateRange?.to
      ? new Date(new Date(dateRange.to).setUTCHours(23, 59, 59, 999))
      : undefined;

    return {
      from,
      to,
    };
  }

  private prismaResponse(): Prisma.OrderSelect {
    return {
      id: true,
      amount: true,
      type: true,
      date: true,
      customer: {
        select: {
          id: true,
          name: true,
          type: true,
          color: true,
        },
      },
      items: {
        select: {
          id: true,
          orderId: true,
          quantity: true,
          unitPrice: true,
          product: {
            select: {
              id: true,
              name: true,
              imagePath: true,
              description: true,
            },
          },
        },
      },
    };
  }
}
