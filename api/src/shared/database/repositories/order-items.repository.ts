import { Injectable } from '@nestjs/common';
import { OrderItem } from 'src/modules/order-items/entities/order-item.entity';
import {
  CreateOrderItemDto,
  DeleteOrderItemDto,
  FindManyByOrderIdDto,
  FindUniqueOrderItemByIdDto,
  IOrderItemsRepository,
  UpdateOrderItemDto,
} from '../interfaces/orders-item-repository.interface';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OrderItemsRepository implements IOrderItemsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findManyByOrderId(
    findManyByOrderDto: FindManyByOrderIdDto,
  ): Promise<OrderItem[]> {
    const { orderId, userId, order } = findManyByOrderDto;

    return this.prismaService.orderItem.findMany({
      where: { orderId, userId },
      orderBy: {
        name: order,
      },
    });
  }

  async findUniqueByUserId(
    findUniqueDto: FindUniqueOrderItemByIdDto,
  ): Promise<OrderItem> {
    const { userId, id } = findUniqueDto;

    const findedOrderItem = await this.prismaService.orderItem.findUnique({
      where: { userId, id },
    });

    return findedOrderItem;
  }

  async create(createDto: CreateOrderItemDto): Promise<OrderItem> {
    const { data, userId } = createDto;

    const { name, ingredients, quantity, total, unitPrice, orderId } = data;

    const createdOrderItem = await this.prismaService.orderItem.create({
      data: {
        name,
        unitPrice,
        quantity,
        ingredients,
        total,
        orderId,
        userId,
      },
    });

    return createdOrderItem;
  }

  async update(updateDto: UpdateOrderItemDto): Promise<OrderItem> {
    const { data, userId } = updateDto;

    const { id, name, ingredients, quantity, unitPrice, total } = data;

    const updatedOrderItem = await this.prismaService.orderItem.update({
      where: { userId, id },
      data: {
        name,
        ingredients,
        quantity,
        unitPrice,
        total,
      },
    });

    return updatedOrderItem;
  }

  async delete(deleteDto: DeleteOrderItemDto): Promise<void> {
    const { id, userId } = deleteDto;

    await this.prismaService.orderItem.delete({
      where: { id, userId },
    });
  }
}

// create(createDto: Prisma.OrderItemCreateArgs) {
//   return this.prismaService.orderItem.create(createDto);
// }

// findFirst(findFirstDto: Prisma.OrderItemFindFirstArgs) {
//   return this.prismaService.orderItem.findFirst(findFirstDto);
// }

// findMany(findManyDto: Prisma.OrderItemFindManyArgs) {
//   return this.prismaService.orderItem.findMany(findManyDto);
// }

// findUnique(findUniqueDto: Prisma.OrderItemFindUniqueArgs) {
//   return this.prismaService.orderItem.findFirst(findUniqueDto);
// }

// update(updateDto: Prisma.OrderItemUpdateArgs) {
//   return this.prismaService.orderItem.update(updateDto);
// }

// delete(deleteDto: Prisma.OrderItemDeleteArgs) {
//   return this.prismaService.orderItem.delete(deleteDto);
// }
