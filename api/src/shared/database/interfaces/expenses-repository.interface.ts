import { Expense } from 'src/modules/expenses/entities/expense.entity';
import { DateRangeDto } from 'src/shared/dto/date-range.dto';

export const IExpensesRepository = Symbol('IExpensesRepository');

export interface IExpensesRepository {
  findManyByUserId(findAllDto: FindManyExpenseDto): Promise<Expense[]>;

  findManyByCategory(
    findAllDto: FindManyExpenseDto,
  ): Promise<Partial<Expense>[]>;

  findOneByUserId(findOneDto: FindOneExpenseDto): Promise<Expense>;

  create(createDto: CreateExpenseDto): Promise<Expense>;

  update(updateDto: UpdateExpenseDto): Promise<Expense>;

  delete(deleteDto: DeleteExpenseDto): Promise<void>;
}

export type FindManyExpenseDto = {
  userId: string;
  dateRange: DateRangeDto;
};

export type FindOneExpenseDto = {
  userId: string;
  id: string;
};

export type CreateExpenseDto = {
  userId: string;
  data: Expense | Omit<Expense, 'id'>;
};

export type UpdateExpenseDto = {
  userId: string;
  data: Expense;
};

export type DeleteExpenseDto = {
  userId: string;
  id: string;
};
