import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

import { Income } from 'src/modules/dashboard/entities/income.entity';

import {
  FindManyDto,
  IIncomesRepository,
} from '../interfaces/incomes-repository.interface';

import {
  IncomeMapper,
  PrismaPaymentWithClientName,
} from '../mappers/income.mapper';

@Injectable()
export class IncomesRepository implements IIncomesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findManyByUser(findManyDto: FindManyDto): Promise<Income[]> {
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

    return incomes.map(this.parser);
  }

  async findManyInGroupByUserId(findManyDto: FindManyDto): Promise<Income[]> {
    const { userId, dateRange } = findManyDto;

    const { fromDate, toDate } = dateRange;

    const incomes = await this.prismaService.$queryRaw<
      PrismaPaymentWithClientName[]
    >`
    SELECT
        c."name" AS "clientName",
        p."type",
        SUM(p."value") AS "value",
        DATE(p."date") AS "date"  -- Apenas a data, sem horário
    FROM "payments" p
    JOIN "clients" c ON p."client_id" = c."id"
    WHERE p."user_id" = ${userId}::uuid
      AND p."date" BETWEEN ${fromDate}::timestamp AND ${toDate}::timestamp
    GROUP BY c."name", p."type", DATE(p."date")  -- Agrupando só pela data (sem hora)
    ORDER BY "value" DESC;
  `;

    return incomes.map(this.parser);
  }

  async findManyByCategory(
    findManyDto: FindManyDto,
  ): Promise<Partial<Income>[]> {
    const { userId, dateRange } = findManyDto;
    const { fromDate, toDate } = dateRange;

    const incomes = await this.prismaService.$queryRaw<
      Partial<PrismaPaymentWithClientName>[]
    >`
      SELECT
      p."type",
      (SELECT p2."id" FROM "payments" p2 WHERE p2."type" = p."type" AND p2."user_id" = p."user_id" LIMIT 1) AS "id",
      SUM(p."value") AS "value",
      MAX(p."date") AS "date"
    FROM "payments" p
    WHERE p."user_id" = ${userId}::uuid
      AND p."date" BETWEEN ${fromDate}::timestamp AND ${toDate}::timestamp
    GROUP BY p."type", p."user_id"
    ORDER BY "value" DESC;
    `;

    return incomes.map(this.partialParser);
  }

  private parser(prismaIncome: PrismaPaymentWithClientName) {
    return IncomeMapper.getInstance().toDomain(prismaIncome);
  }

  private partialParser(prismaIncome: Partial<PrismaPaymentWithClientName>) {
    return IncomeMapper.getInstance().partialIncomeToDomain(prismaIncome);
  }
}
