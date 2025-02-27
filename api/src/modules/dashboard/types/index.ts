import { Expense } from 'src/modules/expenses/entities/expense.entity';
import { Income } from '../entities/income.entity';

export interface IHistory<TEntity> {
  monthYear: string;
  days: {
    day: string;
    items: TEntity[];
  }[];
}

export interface IHistoryResponse<TEntity> {
  total: number;
  history: IHistory<TEntity>[];
}

export interface IIncomesANDExpenses {
  incomes: Income[] | Partial<Income>[];
  expenses: Expense[] | Partial<Expense>[];
}
