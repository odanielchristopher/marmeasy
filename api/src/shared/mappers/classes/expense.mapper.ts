import { Expense as PrismaExpense } from '@prisma/client';
import {
  Expense,
  ExpenseType,
} from 'src/modules/expenses/entities/expense.entity';
import { IDataMapper } from '../interfaces/data-mapper.interface';

export class ExpenseMapper implements IDataMapper<PrismaExpense, Expense> {
  toDomain(persistenceObject: PrismaExpense): Expense {
    if (!persistenceObject) {
      return null;
    }

    const { id, date, type, value } = persistenceObject;

    return {
      id,
      value,
      date: date.toISOString(),
      type: ExpenseType[type],
    };
  }
}
