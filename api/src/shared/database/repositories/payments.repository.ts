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

import { DateRangeDto } from 'src/shared/dto/date-range.dto';
import { DataMapperType } from 'src/shared/mappers/factories/data-mappers.factory';
import { IDataMappersFactory } from 'src/shared/mappers/interfaces/data-mappers-factory.interface';
import { IPaginatedResponse } from 'src/shared/types';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PaymentsRepository implements IPaymentsRepository {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(IDataMappersFactory)
    private readonly dataMappersFactory: IDataMappersFactory,
  ) {}

  async findManyByClientId(
    findManyDto: FindManyPaymentsByIdDto,
  ): Promise<IPaginatedResponse<Payment[]>> {
    const { order, customerId, userId, dateRange } = findManyDto;

    const { from, to } = this.parseDateRange(dateRange);

    const findendPayments = await this.prismaService.payment.findMany({
      where: {
        customerId,
        userId,
        date: {
          gte: from,
          lte: to,
        },
      },
      orderBy: {
        date: order,
      },
    });

    const data = findendPayments.map((payment) => this.parser(payment));

    const items = await this.prismaService.payment.count({
      where: {
        userId,
        customerId,
        date: {
          gte: from,
          lte: to,
        },
      },
    });

    return {
      data,
      items,
    };
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

    const { customerId, date, type, value } = data;

    const createdPayment = await this.prismaService.payment.create({
      data: {
        userId,
        customerId,
        date,
        type,
        value,
      },
    });

    return this.parser(createdPayment);
  }

  async update(updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    const { data, userId } = updatePaymentDto;

    const { customerId, date, type, value } = data;

    const updatedPayment = await this.prismaService.payment.update({
      where: { userId, id: data.id },
      data: {
        userId,
        customerId,
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
    return this.dataMappersFactory
      .getInstance<PrismaPayment, Payment>(DataMapperType.PAYMENT)
      .toDomain(prismaPayment);
  }

  private parseDateRange(dateRange?: DateRangeDto) {
    const from = dateRange?.from
      ? new Date(new Date(dateRange.from).setUTCHours(0, 0, 0, 0))
      : undefined;

    const to = dateRange?.to
      ? new Date(new Date(dateRange.to).setUTCHours(23, 59, 59, 999))
      : undefined;

    return {
      from,
      to,
    };
  }
}
