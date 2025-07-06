import { Inject, Injectable } from '@nestjs/common';
import { IUpdateCustomerBalanceService } from 'src/modules/customers/interfaces/update-customer-balance-service.interface';
import { IValidateCustomerOwnershipService } from 'src/modules/customers/interfaces/validate-customer-ownership-service.interface';
import { IPaymentsRepository } from 'src/shared/database/interfaces/payments-repository.interface';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { UpdatePaymentDto } from '../dto/update-payment.dto';
import {
  IPaymentsService,
  PaymentFilters,
} from '../interfaces/payments-service.interface';
import { IValidatePaymentOwnershipService } from '../interfaces/validate-payment-onwership-service.interface';

@Injectable()
export class PaymentsService implements IPaymentsService {
  constructor(
    @Inject(IPaymentsRepository)
    private readonly paymentsRepository: IPaymentsRepository,
    @Inject(IValidatePaymentOwnershipService)
    private readonly validatePaymentOwnershipService: IValidatePaymentOwnershipService,
    @Inject(IValidateCustomerOwnershipService)
    private readonly validateCustomerOwnershipService: IValidateCustomerOwnershipService,
    @Inject(IUpdateCustomerBalanceService)
    private readonly updateCustomerBalanceService: IUpdateCustomerBalanceService,
  ) {}

  async findAllByCustomerId(
    userId: string,
    clientId: string,
    filters: PaymentFilters,
  ) {
    return this.paymentsRepository.findManyByClientId({
      userId,
      customerId: clientId,
      order: filters.order === 'asc' ? 'asc' : 'desc',
      dateRange: filters.dateRange,
    });
  }

  async create(userId: string, createPaymentDto: CreatePaymentDto) {
    const { date, type, value, customerId, description } = createPaymentDto;

    await this.validateEntitiesOwnership({
      userId,
      customerId,
    });

    await this.updateCustomerBalanceService.update({
      userId,
      customerId,
      operationType: 'CREDIT',
      newValue: value,
    });

    return this.paymentsRepository.create({
      userId,
      data: {
        customerId,
        date,
        type,
        value,
        description,
      },
    });
  }

  async update(
    userId: string,
    paymentId: string,
    updatePaymentDto: UpdatePaymentDto,
  ) {
    const { date, type, value, customerId, description } = updatePaymentDto;

    const { payment } = await this.validateEntitiesOwnership({
      userId,
      paymentId,
    });

    await this.updateCustomerBalanceService.update({
      userId,
      customerId,
      operationType: 'CREDIT',
      previousValue: payment.value,
      newValue: value,
    });

    return this.paymentsRepository.update({
      userId,
      data: {
        id: paymentId,
        customerId,
        date,
        type,
        value,
        description,
      },
    });
  }

  async remove(userId: string, paymentId: string) {
    const { payment } = await this.validateEntitiesOwnership({
      userId,
      paymentId,
    });

    const { customerId, value } = payment;

    await this.updateCustomerBalanceService.update({
      customerId,
      operationType: 'CREDIT',
      userId,
      previousValue: value,
      newValue: 0,
    });

    return this.paymentsRepository.delete({
      userId,
      id: paymentId,
    });
  }

  private async validateEntitiesOwnership({
    userId,
    paymentId,
    customerId,
  }: {
    userId: string;
    customerId?: string;
    paymentId?: string;
  }) {
    const [payment, customer] = await Promise.all([
      paymentId &&
        this.validatePaymentOwnershipService.validate(userId, paymentId),
      customerId &&
        this.validateCustomerOwnershipService.validate(userId, customerId),
    ]);

    return { payment, customer };
  }
}
