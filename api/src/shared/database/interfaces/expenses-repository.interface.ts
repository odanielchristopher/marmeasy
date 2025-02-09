import { Expense } from 'src/modules/expenses/entities/expense.entity';

export interface IExpensesRepository {
  findOneByUserId(findOneDto: FindOneExpenseDto): Promise<Expense>;

  create(createDto: CreateExpenseDto): Promise<Expense>;

  update(updateDto: UpdateExpenseDto): Promise<Expense>;

  delete(deleteDto: DeleteExpenseDto): Promise<void>;
}

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
