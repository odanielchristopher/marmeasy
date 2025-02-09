import { Payment as PrismaPayment } from '@prisma/client';
import {
  Payment,
  PaymentType,
} from 'src/modules/payments/entities/payment.entity';

export class PaymentMapper {
  private static instance: PaymentMapper;

  static getInstance() {
    if (!this.instance) {
      return new PaymentMapper();
    }

    return this.instance;
  }

  private constructor() {}

  toDomain(persistenceObject: PrismaPayment): Payment {
    if (!persistenceObject) {
      return null;
    }

    const { id, date, type, value, clientId, userId } = persistenceObject;

    return {
      id,
      value,
      clientId,
      userId,
      date: date.toISOString(),
      type: PaymentType[type],
    };
  }
}
