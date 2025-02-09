import { Inject, Injectable } from '@nestjs/common';
import { IExpensesRepository } from 'src/shared/database/interfaces/expenses-repository.interface';
import { Expense } from '../entities/expense.entity';
import { IValidateExpenseOwnershipService } from '../interfaces/validate-expense-ownership-service.interface';

@Injectable()
export class ValidateExpenseOwnershipService
  implements IValidateExpenseOwnershipService
{
  constructor(
    @Inject(IExpensesRepository)
    private readonly expensesRepository: IExpensesRepository,
  ) {}

  async validate(userId: string, expenseId: string): Promise<Expense> {
    throw new Error('Method not implemented.');
  }
}
