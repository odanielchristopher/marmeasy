export enum OrderType {
  BREAKFAST = 'BREAKFAST',
  LUNCH = 'LUNCH',
  DINNER = 'DINNER',
}

export class OrderItem {
  id?: string;
  orderId?: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  product?: {
    name: string;
    imagePath: string;
  };
}

export class Order {
  id: string;
  customerId: string;
  date: Date;
  type: OrderType;
  items: OrderItem[];
  amount: number;
}
