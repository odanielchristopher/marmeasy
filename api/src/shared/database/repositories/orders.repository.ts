import { Injectable } from '@nestjs/common';
import { Order } from 'src/modules/orders/entities/order.entity';
import {
  CreateOrderDto,
  DeleteOrderItemDto,
  FindFirstOrderByClientIdDto,
  FindManyByClientIdDto,
  FindUniqueOrderByIdDto,
  IOrdersRepository,
  UpdateOrderDto,
} from '../interfaces/orders-repository.interface';
import { PrismaService } from '../prisma.service';

const prismaResponse = {
  id: true,
  userId: true,
  clientId: true,
  date: true,
  discount: true,
  status: true,
  totalValue: true,
  items: {
    select: {
      id: true,
      orderId: true,
      name: true,
      ingredients: true,
      unitPrice: true,
      quantity: true,
      total: true,
    },
  },
};

@Injectable()
export class OrdersRepository implements IOrdersRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findManyByClientId(
    findManyByClientIdDto: FindManyByClientIdDto,
  ): Promise<Order[]> {
    const { order, userId, clientId } = findManyByClientIdDto;

    const findendOrders = await this.prismaService.order.findMany({
      where: { userId, clientId },
      orderBy: { date: order },
      select: prismaResponse,
    });

    return findendOrders.map(Order.parse);
  }

  async findFirstByClientId(
    findFirstByClientIdDto: FindFirstOrderByClientIdDto,
  ): Promise<Order> {
    const { id, userId, clientId } = findFirstByClientIdDto;

    const findedOrder = await this.prismaService.order.findFirst({
      where: { id, userId, clientId },
      select: prismaResponse,
    });

    return Order.parse(findedOrder);
  }

  async findUniqueByUserId(
    findUniqueDto: FindUniqueOrderByIdDto,
  ): Promise<Order> {
    const { id, userId } = findUniqueDto;

    const findedOrder = await this.prismaService.order.findUnique({
      where: { id, userId },
      select: prismaResponse,
    });

    return Order.parse(findedOrder);
  }

  async create(createDto: CreateOrderDto): Promise<Order> {
    const { data, userId } = createDto;

    const { items, date, discount, status, totalValue, clientId } = data;

    const createdOrder = await this.prismaService.order.create({
      data: {
        date,
        discount,
        status,
        totalValue,
        clientId,
        userId,
        items: {
          createMany: {
            data: items.map((item) => ({ ...item, userId })),
          },
        },
      },
      select: prismaResponse,
    });

    return Order.parse(createdOrder);
  }

  async update(updateDto: UpdateOrderDto): Promise<Order> {
    const { data, userId } = updateDto;

    const { items, date, discount, status, totalValue, clientId } = data;

    const updatedOrder = await this.prismaService.order.update({
      where: { userId, id: data.id },
      data: {
        date,
        discount,
        status,
        totalValue,
        clientId,
        userId,
        items: {
          createMany: {
            data: items.map((item) => ({ ...item, userId })),
          },
        },
      },
      select: prismaResponse,
    });

    return Order.parse(updatedOrder);
  }

  async delete(deleteDto: DeleteOrderItemDto): Promise<Order | void> {
    const { id, userId } = deleteDto;

    await this.prismaService.order.delete({
      where: { id, userId },
      include: { items: true },
    });
  }
}
