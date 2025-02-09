import { Injectable } from '@nestjs/common';
import { Expense as PrismaExpense } from '@prisma/client';

import {
  CreateExpenseDto,
  DeleteExpenseDto,
  FindManyExpenseDto,
  FindOneExpenseDto,
  IExpensesRepository,
  UpdateExpenseDto,
} from '../interfaces/expenses-repository.interface';

import { Expense } from 'src/modules/expenses/entities/expense.entity';
import { ExpenseMapper } from '../mappers/expense.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ExpensesRepository implements IExpensesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findManyByCategory(
    findAllDto: FindManyExpenseDto,
  ): Promise<Partial<Expense>[]> {
    const { userId, dateRange } = findAllDto;
    const { fromDate, toDate } = dateRange;

    const expenses = await this.prismaService.$queryRaw<PrismaExpense[]>`
      SELECT
        e."type",
        (SELECT e2."id" FROM "expenses" e2 WHERE e2."type" = e."type" AND e2."user_id" = e."user_id" LIMIT 1) AS "id",
        SUM(e."value") AS "value",
        MAX(e."date") AS "date"
      FROM "expenses" e
      WHERE e."user_id" = ${userId}::uuid
        AND e."date" BETWEEN ${fromDate}::timestamp AND ${toDate}::timestamp
      GROUP BY e."type", e."user_id"
      ORDER BY "value" DESC;
    `;

    return expenses.map(this.parser);
  }

  async findManyByUserId(findAllDto: FindManyExpenseDto): Promise<Expense[]> {
    const { userId, dateRange } = findAllDto;

    const { fromDate, toDate } = dateRange;

    const expenses = await this.prismaService.expense.findMany({
      where: {
        userId,
        date: {
          gte: fromDate,
          lte: toDate,
        },
      },
    });

    return expenses.map(this.parser);
  }

  async findOneByUserId(findOneDto: FindOneExpenseDto): Promise<Expense> {
    const { id, userId } = findOneDto;

    const findedExpense = await this.prismaService.expense.findUnique({
      where: { id, userId },
    });

    return this.parser(findedExpense);
  }

  async create(createDto: CreateExpenseDto): Promise<Expense> {
    const { userId, data } = createDto;

    const { date, type, value } = data;

    const createdExpense = await this.prismaService.expense.create({
      data: {
        userId,
        date,
        type,
        value,
      },
    });

    return this.parser(createdExpense);
  }

  async update(updateDto: UpdateExpenseDto): Promise<Expense> {
    const { userId, data } = updateDto;

    const { id, date, type, value } = data;

    const updatedExpense = await this.prismaService.expense.update({
      where: { userId, id },
      data: {
        date,
        type,
        value,
      },
    });

    return this.parser(updatedExpense);
  }

  async delete(deleteDto: DeleteExpenseDto): Promise<void> {
    const { id, userId } = deleteDto;

    await this.prismaService.expense.delete({
      where: { userId, id },
    });
  }

  private parser(prismaExpense: PrismaExpense) {
    return ExpenseMapper.getInstance().toDomain(prismaExpense);
  }
}
