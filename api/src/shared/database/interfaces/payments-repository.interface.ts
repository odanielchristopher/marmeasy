import { Payment } from 'src/modules/payments/entities/payment.entity';

export const IPaymentsRepository = Symbol('IPaymentsRepository');

export interface IPaymentsRepository {
  findManyByUserId(findManyByUserDto: FindManyByUserDto): Promise<Payment[]>;

  findManyByClientId(findManyDto: FindManyPaymentsByIdDto): Promise<Payment[]>;

  findFirstByUserId(findFirstByIdDto: FindFirstPaymentDto): Promise<Payment>;

  create(createPaymentDto: CreatePaymentDto): Promise<Payment>;

  update(updatePaymentDto: UpdatePaymentDto): Promise<Payment>;

  delete(deletePaymentDto: DeletePaymentDto): Promise<void>;
}

export type FindFirstPaymentDto = {
  userId: string;
  id: string;
};

export type FindManyByUserDto = {
  userId: string;
};

export type FindManyPaymentsByIdDto = {
  userId: string;
  clientId: string;
  order: 'asc' | 'desc';
};

export type CreatePaymentDto = {
  data: Payment | Omit<Payment, 'id' | 'userId'>;
  userId: string;
};

export type UpdatePaymentDto = {
  userId: string;
  data: Payment | Omit<Payment, 'userId'>;
};

export type DeletePaymentDto = {
  userId: string;
  id: string;
};
