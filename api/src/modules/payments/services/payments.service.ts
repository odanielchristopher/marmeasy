import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'src/modules/clients/entities/client.entity';
import { IUpdateClientBalanceService } from 'src/modules/clients/interfaces/update-client-balance-service.interface';
import { IValidateClientOwnershipService } from 'src/modules/clients/interfaces/validate-client-ownership-service.interface';
import { IPaymentsRepository } from 'src/shared/database/interfaces/payments-repository.interface';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { UpdatePaymentDto } from '../dto/update-payment.dto';
import { IPaymentsService } from '../interfaces/payments-service.interface';
import { IValidatePaymentOwnershipService } from '../interfaces/validate-payment-onwership-service.interface';

@Injectable()
export class PaymentsService implements IPaymentsService {
  constructor(
    @Inject(IPaymentsRepository)
    private readonly paymentsRepository: IPaymentsRepository,
    @Inject(IUpdateClientBalanceService)
    private readonly updateClientBalanceService: IUpdateClientBalanceService,
    @Inject(IValidatePaymentOwnershipService)
    private readonly validatePaymentOwnershipService: IValidatePaymentOwnershipService,
    @Inject(IValidateClientOwnershipService)
    private readonly validateClientOwnershipService: IValidateClientOwnershipService,
  ) {}

  async findAllByClientId(userId: string, clientId: string) {
    return this.paymentsRepository.findManyByClientId({
      userId,
      clientId,
      order: 'asc',
    });
  }

  async create(userId: string, createPaymentDto: CreatePaymentDto) {
    const { date, type, value, clientId } = createPaymentDto;

    await this.validateEntitiesOwnership({
      userId,
      clientId,
    });

    await this.updateClientBalance({
      userId,
      clientId,
      newValue: value,
    });

    return this.paymentsRepository.create({
      userId,
      data: {
        clientId,
        date,
        type,
        value,
      },
    });
  }

  async update(
    userId: string,
    paymentId: string,
    updatePaymentDto: UpdatePaymentDto,
  ) {
    const { date, type, value, clientId } = updatePaymentDto;

    const { payment } = await this.validateEntitiesOwnership({
      userId,
      paymentId,
    });

    await this.updateClientBalance({
      userId,
      clientId,
      previousValue: payment.value,
      newValue: value,
    });

    return this.paymentsRepository.update({
      userId,
      data: {
        id: paymentId,
        clientId,
        date,
        type,
        value,
      },
    });
  }

  async remove(userId: string, paymentId: string) {
    const { payment } = await this.validateEntitiesOwnership({
      userId,
      paymentId,
    });

    const { clientId, value } = payment;

    await this.updateClientBalance({
      clientId,
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
    clientId,
    paymentId,
  }: {
    userId: string;
    clientId?: string;
    paymentId?: string;
  }) {
    const [client, payment] = await Promise.all([
      clientId &&
        this.validateClientOwnershipService.validate(userId, clientId),
      paymentId &&
        this.validatePaymentOwnershipService.validate(userId, paymentId),
    ]);

    return { client, payment };
  }

  private async updateClientBalance({
    userId,
    clientId,
    previousValue,
    newValue,
  }: {
    userId: string;
    clientId: string;
    previousValue?: number;
    newValue: number;
  }): Promise<Client> {
    return this.updateClientBalanceService.update({
      userId,
      clientId,
      previousValue,
      newValue,
    });
  }
}
