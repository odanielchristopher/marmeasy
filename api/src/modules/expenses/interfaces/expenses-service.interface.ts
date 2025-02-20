import { CreateExpenseDto } from '../dto/create-expense.dto';
import { UpdateExpenseDto } from '../dto/update-expense.dto';
import { Expense } from '../entities/expense.entity';

export const IExpensesService = Symbol('IExpensesService');

export interface IExpensesService {
  create(userId: string, createExpenseDto: CreateExpenseDto): Promise<Expense>;

  update(
    userId: string,
    expenseId: string,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<Expense>;

  remove(userId: string, expenseId: string): Promise<void>;
}
