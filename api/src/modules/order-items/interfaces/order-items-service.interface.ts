import { CreateOrderItemDto } from '../dto/create-order-items.dto';
import { UpdateOrderItemDto } from '../dto/update-ordem-item.dto';
import { OrderItem } from '../entities/order-item.entity';

export const IOrderItemsService = Symbol('OrderItemsService');

export interface IOrderItemsService {
  findAllByOrder(userId: string, orderId: string): Promise<OrderItem[]>;

  findOneById(userId: string, orderItemId: string): Promise<OrderItem>;

  create(
    userId: string,
    orderId: string,
    createOrderItemDto: CreateOrderItemDto,
  ): Promise<OrderItem>;

  update(
    userId: string,
    orderItemId: string,
    updateOrderItemDto: UpdateOrderItemDto,
  ): Promise<OrderItem>;

  delete(
    userId: string,
    orderItemId: string,
  ): Promise<{ message: string } | void | null>;
}
