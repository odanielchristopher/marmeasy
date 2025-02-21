import { Payment as PrismaPayment } from '@prisma/client';
import { Income } from 'src/modules/dashboard/entities/income.entity';
import { PaymentType } from 'src/modules/payments/entities/payment.entity';
import { IDataMapper } from '../interfaces/data-mapper.interface';

export type PrismaPaymentWithClientName = PrismaPayment & {
  clientName: string;
};
export class IncomeMapper
  implements IDataMapper<PrismaPaymentWithClientName, Income>
{
  private static instace: IncomeMapper;

  static getInstance() {
    if (!this.instace) {
      this.instace = new IncomeMapper();
    }

    return this.instace;
  }

  toDomain(persistenceObject: PrismaPaymentWithClientName): Income {
    if (!persistenceObject) {
      return null;
    }

    const { id, date, type, value, clientName } = persistenceObject;

    return {
      id,
      value,
      clientName,
      date: date.toISOString(),
      type: PaymentType[type],
    };
  }

  partialIncomeToDomain(
    persistenceObject: Partial<PrismaPayment>,
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
