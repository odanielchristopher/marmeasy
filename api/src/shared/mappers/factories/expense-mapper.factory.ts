import { Expense as PrismaExpense } from '@prisma/client';
import { Expense } from 'src/modules/expenses/entities/expense.entity';
import { ExpenseMapper } from '../classes/expense.mapper';
import { IDataMapperFactory } from '../interfaces/data-mapper-factory.interface';
import { IDataMapper } from '../interfaces/data-mapper.interface';

export const IExpenseMapperFactory = Symbol('IExpenseMapperFactory');

export class ExpenseMapperFactory
  implements IDataMapperFactory<PrismaExpense, Expense>
{
  getInstance(): IDataMapper<PrismaExpense, Expense> {
    return ExpenseMapper.getInstance();
  }
}
