import { Inject, Injectable } from '@nestjs/common';
import { IExpensesRepository } from 'src/shared/database/interfaces/expenses-repository.interface';
import { CreateExpenseDto } from '../dto/create-expense.dto';
import { UpdateExpenseDto } from '../dto/update-expense.dto';
import { Expense } from '../entities/expense.entity';
import { IExpensesService } from '../interfaces/expenses-service.interface';

@Injectable()
export class ExpensesService implements IExpensesService {
  constructor(
    @Inject(IExpensesRepository)
    private readonly expensesRepository: IExpensesRepository,
  ) {}

  create(userId: string, createExpenseDto: CreateExpenseDto): Promise<Expense> {
    throw new Error('Method not implemented.');
  }

  update(
    userId: string,
    expenseId: string,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<Expense> {
    throw new Error('Method not implemented.');
  }

  remove(userId: string, expenseId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
