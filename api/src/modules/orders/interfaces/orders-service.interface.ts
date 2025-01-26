import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { UpdateStatusOrderDto } from '../dto/update-status-order.dto';
import { Order } from '../entities/order.entity';

export const IOrdersService = Symbol('IOrdersService');

export interface IOrdersService {
  findAllByClientId(userId: string, clientId: string): Promise<Order[]>;

  findOneById(userId: string, orderId: string): Promise<Order>;

  create(userId: string, createOrderDto: CreateOrderDto): Promise<Order>;

  update(
    userId: string,
    orderId: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order>;

  updateStatus(
    userId: string,
    orderId: string,
    updateOrderStatusDto: UpdateStatusOrderDto,
  ): Promise<Order>;

  delete(
    userId: string,
    orderId: string,
  ): Promise<{
    message: string;
  }>;

  deleteItem(
    userId: string,
    orderId: string,
    orderItemId: string,
  ): Promise<{
    message: string;
  }>;
}
