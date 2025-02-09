import { Payment as PrismaPayment } from '@prisma/client';
import { Income } from 'src/modules/dashboard/entities/income.entity';
import { PaymentType } from 'src/modules/payments/entities/payment.entity';

export type PrismaPaymentWithClientName = PrismaPayment & {
  client: { name: string };
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

    const { id, date, type, value, client } = persistenceObject;

    return {
      id,
      value,
      date: date.toISOString(),
      type: PaymentType[type],
      clientName: client.name,
    };
  }
}
