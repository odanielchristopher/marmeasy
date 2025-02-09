import { Inject, Injectable } from '@nestjs/common';
import { IExpensesRepository } from 'src/shared/database/interfaces/expenses-repository.interface';
import { CreateExpenseDto } from '../dto/create-expense.dto';
import { UpdateExpenseDto } from '../dto/update-expense.dto';
import { IExpensesService } from '../interfaces/expenses-service.interface';
import { IValidateExpenseOwnershipService } from '../interfaces/validate-expense-ownership-service.interface';

@Injectable()
export class ExpensesService implements IExpensesService {
  constructor(
    @Inject(IExpensesRepository)
    private readonly expensesRepository: IExpensesRepository,
    @Inject(IValidateExpenseOwnershipService)
    private readonly validateExpenseOwnerShipService: IValidateExpenseOwnershipService,
  ) {}

  create(userId: string, createExpenseDto: CreateExpenseDto) {
    const { date, type, value } = createExpenseDto;

    return this.expensesRepository.create({
      userId,
      data: {
        date,
        type,
        value,
      },
    });
  }

  async update(
    userId: string,
    expenseId: string,
    updateExpenseDto: UpdateExpenseDto,
  ) {
    await this.validateExpenseOwnerShipService.validate(userId, expenseId);

    const { date, type, value } = updateExpenseDto;

    return this.expensesRepository.create({
      userId,
      data: {
        id: expenseId,
        date,
        type,
        value,
      },
    });
  }

  async remove(userId: string, expenseId: string) {
    await this.validateExpenseOwnerShipService.validate(userId, expenseId);

    await this.expensesRepository.delete({ userId, id: expenseId });
  }
}
