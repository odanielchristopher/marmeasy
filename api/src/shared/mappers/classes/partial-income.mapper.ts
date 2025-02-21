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
  implements IDataMapper<Partial<PrismaPaymentWithClientName>, Partial<Income>>
{
  private static instace: PartialIncomeMapper;

  static getInstance() {
    if (!this.instace) {
      this.instace = new PartialIncomeMapper();
    }

    return this.instace;
  }

  toDomain(
    persistenceObject: Partial<PrismaPaymentWithClientName>,
  ): Partial<Income> {
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
