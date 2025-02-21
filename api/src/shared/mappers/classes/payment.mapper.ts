import { Payment as PrismaPayment } from '@prisma/client';
import {
  Payment,
  PaymentType,
} from 'src/modules/payments/entities/payment.entity';
import { IDataMapper } from '../interfaces/data-mapper.interface';

export class PaymentMapper implements IDataMapper<PrismaPayment, Payment> {
  private static instace: PaymentMapper;

  static getInstance() {
    if (!this.instace) {
      this.instace = new PaymentMapper();
    }

    return this.instace;
  }

  toDomain(persistenceObject: PrismaPayment): Payment {
    if (!persistenceObject) {
      return null;
    }

    const { id, date, type, value, clientId, userId, ...rest } =
      persistenceObject;

    return {
      id,
      value,
      clientId,
      userId,
      date: date.toISOString(),
      type: PaymentType[type],
      ...rest,
    };
  }
}
