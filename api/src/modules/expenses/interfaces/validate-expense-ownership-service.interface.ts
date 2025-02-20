import { Expense } from '../entities/expense.entity';

export const IValidateExpenseOwnershipService = Symbol(
  'IValidateExpenseOwnershipService',
);

export interface IValidateExpenseOwnershipService {
  validate(userId: string, expenseId: string): Promise<Expense>;
}
