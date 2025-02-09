import { Payment as PrismaPayment } from '@prisma/client';
import { Income } from 'src/modules/dashboard/entities/income.entity';
import { PaymentType } from 'src/modules/payments/entities/payment.entity';

export type PrismaPaymentWithClientName = PrismaPayment & {
  clientName: string;
};

export class IncomeMapper {
  private static instance: IncomeMapper;

  static getInstance() {
    if (!this.instance) {
      return new IncomeMapper();
    }

    return this.instance;
  }

  private constructor() {}

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
