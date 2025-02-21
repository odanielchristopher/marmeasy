import { Inject, Injectable } from '@nestjs/common';
import { Payment as PrismaPayment } from '@prisma/client';

import { Payment } from 'src/modules/payments/entities/payment.entity';

import {
  CreatePaymentDto,
  DeletePaymentDto,
  FindFirstPaymentDto,
  FindManyPaymentsByIdDto,
  IPaymentsRepository,
  UpdatePaymentDto,
} from '../interfaces/payments-repository.interface';

import { IPaymentMapperFactory } from 'src/shared/mappers/factories/payment-mapper.factory';
import { IDataMapperFactory } from 'src/shared/mappers/interfaces/data-mapper-factory.interface';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PaymentsRepository implements IPaymentsRepository {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(IPaymentMapperFactory)
    private readonly paymentMapperFactory: IDataMapperFactory<
      PrismaPayment,
      Payment
    >,
  ) {}

  async findManyByClientId(
    findManyDto: FindManyPaymentsByIdDto,
  ): Promise<Payment[]> {
    const { order, clientId, userId } = findManyDto;

    const findendPayments = await this.prismaService.payment.findMany({
      where: { clientId, userId },
      orderBy: {
        date: order,
      },
    });

    return findendPayments.map((payment) => this.parser(payment));
  }

  async findFirstByUserId(
    findFirstByIdDto: FindFirstPaymentDto,
  ): Promise<Payment> {
    const { id, userId } = findFirstByIdDto;

    const findedPayment = await this.prismaService.payment.findFirst({
      where: { id, userId },
    });

    return this.parser(findedPayment);
  }

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const { data, userId } = createPaymentDto;

    const { clientId, date, type, value } = data;

    const createdPayment = await this.prismaService.payment.create({
      data: {
        userId,
        clientId,
        date,
        type,
        value,
      },
    });

    return this.parser(createdPayment);
  }

  async update(updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    const { data, userId } = updatePaymentDto;

    const { clientId, date, type, value } = data;

    const updatedPayment = await this.prismaService.payment.update({
      where: { userId, id: data.id },
      data: {
        userId,
        clientId,
        date,
        type,
        value,
      },
    });

    return this.parser(updatedPayment);
  }

  async delete(deletePaymentDto: DeletePaymentDto): Promise<void> {
    const { id, userId } = deletePaymentDto;

    await this.prismaService.payment.delete({
      where: { id, userId },
    });
  }

  private parser(prismaPayment: PrismaPayment) {
    return this.paymentMapperFactory.getInstance().toDomain(prismaPayment);
  }
}
