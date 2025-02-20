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

  async findManyByOrderId(
    findManyByOrderDto: FindManyByOrderIdDto,
  ): Promise<OrderItem[]> {
    const { orderId, userId, order } = findManyByOrderDto;

    const orderItems = await this.prismaService.$queryRaw<OrderItem[]>`
      SELECT *
      FROM order_items
      WHERE order_id = ${orderId}::uuid AND user_id = ${userId}::uuid
      ORDER BY name ${order};
    `;

    return orderItems;
  }

  async findUniqueByUserId(
    findUniqueDto: FindUniqueOrderItemByIdDto,
  ): Promise<OrderItem | null> {
    const { userId, id } = findUniqueDto;

    const foundOrderItem = await this.prismaService.$queryRaw<OrderItem[]>`
      SELECT *
      FROM order_items
      WHERE user_id = ${userId}::uuid AND id = ${id}::uuid
      LIMIT 1;
    `;
    return foundOrderItem[0];
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
