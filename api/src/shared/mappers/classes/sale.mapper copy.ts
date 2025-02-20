import { Injectable } from '@nestjs/common';
import { Order as PrismaOrder } from '@prisma/client';
import { Sale } from 'src/modules/dashboard/entities/sale.entity';
import { IDataMapper } from '../interfaces/data-mapper.interface';

export type PrismaSaleResponse = PrismaOrder & {
  clientName: string;
  quantity: number;
  totalAmount: number;
};

@Injectable()
export class SaleMapper implements IDataMapper<PrismaSaleResponse, Sale> {
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
