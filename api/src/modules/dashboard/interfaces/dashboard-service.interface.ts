import { Expense } from '@prisma/client';
import { FavoriteIngredient } from '../entities/favorite.entity';
import { Income } from '../entities/income.entity';
import { Sale } from '../entities/sale.entity';
import { IHistoryResponse, IIncomesANDExpenses } from '../types';

export const IDashboardService = Symbol('IDashboardService');

export interface IDashboardService {
  getSales(): Promise<IHistoryResponse<Sale>>;

  getIncomes(): Promise<IHistoryResponse<Income>>;

  getExpenses(): Promise<IHistoryResponse<Expense>>;

  getDashboardCategories(): Promise<IIncomesANDExpenses>;

  getFavoritesIngredients(): Promise<FavoriteIngredient[]>;

  getDashboardGraphDatas(): Promise<IIncomesANDExpenses>;
}
