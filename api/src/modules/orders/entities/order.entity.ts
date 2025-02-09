import { OrderItem } from 'src/modules/order-items/entities/order-item.entity';
import { OrderStatus } from './status.entity';
export class Order {
  id: string;
  clientId: string;
  date: Date;
  items: OrderItem[];
  discount: number;
  totalValue: number;
  status: OrderStatus;
}
