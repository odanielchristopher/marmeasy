import { Order as PrismaOrder } from '@prisma/client';
import { OrderItem } from 'src/modules/order-items/entities/order-item.entity';
import { Order } from 'src/modules/orders/entities/order.entity';
import { OrderStatus } from 'src/modules/orders/entities/status.entity';
import { IDataMapper } from '../interfaces/data-mapper.interface';

export type PrismaOrderResponse = PrismaOrder & { items: OrderItem[] };

export class OrderMapper
  implements IDataMapper<PrismaOrderResponse, Order>
{
  private static instance: OrderMapper;

  static getInstance() {
    if (!this.instance) {
      return new OrderMapper();
    }

    return this.instance;
  }

  private constructor() {}

  toDomain(persistenceObject: PrismaOrderResponse): Order {
    if (!persistenceObject) {
      return null;
    }

    const { id, clientId, date, discount, items, status, totalValue } =
      persistenceObject;

    return {
      id,
      clientId,
      date,
      discount,
      items,
      totalValue,
      status: OrderStatus[status],
    };
  }
}
