import { Expense } from 'src/modules/expenses/entities/expense.entity';
import { FavoriteIngredient } from '../entities/favorite.entity';
import { Income } from '../entities/income.entity';
import { Sale } from '../entities/sale.entity';
import { IHistoryResponse, IIncomesANDExpenses } from '../types';

export const IDashboardService = Symbol('IDashboardService');

export interface IDashboardService {
  getSales(userId: string): Promise<IHistoryResponse<Sale>>;

  getIncomes(userId: string): Promise<IHistoryResponse<Income>>;

  getExpenses(userId: string): Promise<IHistoryResponse<Expense>>;

  getDashboardCategories(userId: string): Promise<IIncomesANDExpenses>;

  getFavoritesIngredients(userId: string): Promise<FavoriteIngredient[]>;

  getDashboardGraphDatas(userId: string): Promise<IIncomesANDExpenses>;
}
