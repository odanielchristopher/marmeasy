import { DateRangeDto } from 'src/shared/dto/date-range.dto';
import { IPaginatedResponse } from 'src/shared/types';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { UpdatePaymentDto } from '../dto/update-payment.dto';
import { Payment } from '../entities/payment.entity';

export const IPaymentsService = Symbol('IPaymentsService');

export interface IPaymentsService {
  findAllByCustomerId(
    userId: string,
    clientId: string,
    filters: PaymentFilters,
  ): Promise<IPaginatedResponse<Payment[]>>;
  create(userId: string, createPaymentDto: CreatePaymentDto): Promise<Payment>;
  update(
    userId: string,
    paymentId: string,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment>;
  remove(userId: string, paymentId: string): Promise<void>;
}

export type PaymentFilters = {
  order?: 'asc' | 'desc';
  dateRange?: DateRangeDto;
};
