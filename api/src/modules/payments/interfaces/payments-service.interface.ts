import { CreatePaymentDto } from '../dto/create-payment.dto';
import { UpdatePaymentDto } from '../dto/update-payment.dto';
import { Payment } from '../entities/payment.entity';

export const IPaymentsService = Symbol('IPaymentsService');

export interface IPaymentsService {
  findAllByClientId(userId: string, clientId: string): Promise<Payment[]>;
  create(userId: string, createPaymentDto: CreatePaymentDto): Promise<Payment>;
  update(
    userId: string,
    paymentId: string,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment>;
  remove(userId: string, paymentId: string): Promise<void>;
}
