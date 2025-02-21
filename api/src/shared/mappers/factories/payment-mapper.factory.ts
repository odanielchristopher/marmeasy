import { Payment as PrismaPayment } from '@prisma/client';
import { Payment } from 'src/modules/payments/entities/payment.entity';
import { PaymentMapper } from '../classes/payment.mapper';
import { IDataMapperFactory } from '../interfaces/data-mapper-factory.interface';
import { IDataMapper } from '../interfaces/data-mapper.interface';

export const IPaymentMapperFactory = Symbol('IPaymentMapperFactory');

export class PaymentMapperFactory
  implements IDataMapperFactory<PrismaPayment, Payment>
{
  getInstance(): IDataMapper<PrismaPayment, Payment> {
    return PaymentMapper.getInstance();
  }
}
