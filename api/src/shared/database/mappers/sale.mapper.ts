import { Order as PrismaOrder } from '@prisma/client';
import { Sale } from 'src/modules/dashboard/entities/sale.entity';

export type PrismaSaleResponse = PrismaOrder & {
  clientName: string;
  quantity: number;
  totalAmount: number;
};

export class SaleMapper {
  private static instance: SaleMapper;

  static getInstance() {
    if (!this.instance) {
      return new SaleMapper();
    }

    return this.instance;
  }

  private constructor() {}

  toDomain(persistenceObject: PrismaSaleResponse): Sale {
    if (!persistenceObject) {
      return null;
    }

    const { id, date, totalAmount, clientName, quantity } = persistenceObject;

    return {
      id,
      clientName,
      quantity: Number(quantity),
      value: Number(totalAmount),
      date: date.toISOString(),
    };
  }
}
