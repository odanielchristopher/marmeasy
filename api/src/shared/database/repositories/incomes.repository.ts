import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

import { Income } from 'src/modules/dashboard/entities/income.entity';

import {
  FindManyDto,
  IIncomesRepository,
} from '../interfaces/incomes-repository.interface';

import { Prisma, Payment as PrismaPayment } from '@prisma/client';
import { PrismaPaymentWithClientName } from 'src/shared/mappers/classes/income.mapper';
import { DataMapperType } from 'src/shared/mappers/factories/data-mappers.factory';
import { IDataMappersFactory } from 'src/shared/mappers/interfaces/data-mappers-factory.interface';

@Injectable()
export class IncomesRepository implements IIncomesRepository {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(IDataMappersFactory)
    private readonly dataMappersFactory: IDataMappersFactory,
  ) {}

  async findManyByUser(findManyDto: FindManyDto): Promise<Partial<Income>[]> {
    const { userId, dateRange } = findManyDto;

    const { fromDate, toDate } = dateRange;

    const incomes = await this.prismaService.payment.findMany({
      where: {
        userId,
        date: {
          gte: fromDate,
          lte: toDate,
        },
      },
    });

    return incomes.map((income) => this.partialParser(income));
  }

  async findManyInGroupByUserId(findManyDto: FindManyDto): Promise<Income[]> {
    const { userId, dateRange, type } = findManyDto;

    const { fromDate, toDate } = dateRange;

    const queryType = type
      ? Prisma.sql`AND p.type = ${type}::"PaymentType"`
      : Prisma.sql``;

    const incomes = await this.prismaService.$queryRaw<
      PrismaPaymentWithClientName[]
    >`
    SELECT
        c.name AS "clientName",
        p.type,
        SUM(p.value) AS value,
        DATE(p.date) AS date
    FROM payments p
    JOIN clients c ON p.client_id = c.id
    WHERE p.user_id = ${userId}::uuid
      AND p.date BETWEEN ${fromDate}::timestamp AND ${toDate}::timestamp
      ${queryType}
    GROUP BY c.name, p.type, DATE(p.date)
    ORDER BY value DESC;
  `;

    return incomes.map((income) => this.parser(income));
  }

  async findManyInGroupByCategory(
    findManyDto: FindManyDto,
  ): Promise<Partial<Income>[]> {
    const { userId, dateRange } = findManyDto;
    const { fromDate, toDate } = dateRange;

    const incomes = await this.prismaService.$queryRaw<
      Partial<PrismaPaymentWithClientName>[]
    >`
      SELECT
      p.type,
      (SELECT p2.id FROM payments p2 WHERE p2.type = p.type AND p2.user_id = p.user_id LIMIT 1) AS id,
      SUM(p.value) AS value,
      MAX(p.date) AS date
    FROM payments p
    WHERE p.user_id = ${userId}::uuid
      AND p.date BETWEEN ${fromDate}::timestamp AND ${toDate}::timestamp
    GROUP BY p.type, p.user_id
    ORDER BY value DESC;
    `;

    return incomes.map((income) => this.partialParser(income));
  }

  private parser(prismaIncome: PrismaPaymentWithClientName) {
    return this.dataMappersFactory
      .getInstance<PrismaPaymentWithClientName, Income>(DataMapperType.INCOME)
      .toDomain(prismaIncome);
  }

  private partialParser(prismaIncome: Partial<PrismaPaymentWithClientName>) {
    return this.dataMappersFactory
      .getInstance<
        Partial<PrismaPayment>,
        Partial<Income>
      >(DataMapperType.PARTIAL_INCOME)
      .toDomain(prismaIncome);
  }
}
