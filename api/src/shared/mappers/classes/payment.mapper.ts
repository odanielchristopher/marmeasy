import { Payment as PrismaPayment } from '@prisma/client';
import {
  Payment,
  PaymentType,
} from 'src/modules/payments/entities/payment.entity';
import { IDataMapper } from '../interfaces/data-mapper.interface';

export class PaymentMapper implements IDataMapper<PrismaPayment, Payment> {
  toDomain(persistenceObject: PrismaPayment): Payment {
    if (!persistenceObject) {
      return null;
    }

    const { id, date, type, value, customerId, userId, ...rest } =
      persistenceObject;

    return {
      id,
      value: value.toNumber(),
      customerId,
      userId,
      date: date.toISOString(),
      type: PaymentType[type],
      ...rest,
    };
  }
}
