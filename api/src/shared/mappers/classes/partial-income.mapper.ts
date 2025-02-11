import { Injectable } from '@nestjs/common';
import { Payment as PrismaPayment } from '@prisma/client';
import { Income } from 'src/modules/dashboard/entities/income.entity';
import { PaymentType } from 'src/modules/payments/entities/payment.entity';
import { IDataMapper } from '../interfaces/data-mapper.interface';

export type PrismaPaymentWithClientName = PrismaPayment & {
  clientName: string;
};

@Injectable()
export class PartialIncomeMapper
  implements IDataMapper<Partial<PrismaPayment>, Partial<Income>>
{
  private static instance: PartialIncomeMapper;

  static getInstance() {
    if (!this.instance) {
      return new PartialIncomeMapper();
    }

    return this.instance;
  }

  private constructor() {}

  toDomain(persistenceObject: Partial<PrismaPayment>): Partial<Income> {
    if (!persistenceObject) {
      return null;
    }

    const { id, date, type, value } = persistenceObject;

    return {
      id,
      date: date.toISOString(),
      type: PaymentType[type],
      value: Number(value),
    };
  }
}
