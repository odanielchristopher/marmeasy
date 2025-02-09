import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IExpensesRepository } from 'src/shared/database/interfaces/expenses-repository.interface';
import { IValidateExpenseOwnershipService } from '../interfaces/validate-expense-ownership-service.interface';

@Injectable()
export class ValidateExpenseOwnershipService
  implements IValidateExpenseOwnershipService
{
  constructor(
    @Inject(IExpensesRepository)
    private readonly expensesRepository: IExpensesRepository,
  ) {}

  async validate(userId: string, expenseId: string) {
    const isOwner = await this.expensesRepository.findOneByUserId({
      userId,
      id: expenseId,
    });

    if (!isOwner) {
      throw new NotFoundException('Gasto não encontrado.');
    }

    return isOwner;
  }
}
