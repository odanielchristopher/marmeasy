import { Expense } from 'src/modules/expenses/entities/expense.entity';
import { DateRangeDto } from 'src/shared/dto/date-range.dto';
import { FavoriteIngredient } from '../entities/favorite.entity';
import { Income } from '../entities/income.entity';
import { Sale } from '../entities/sale.entity';
import { IHistoryResponse, IIncomesANDExpenses } from '../types';

export const IDashboardService = Symbol('IDashboardService');

export interface IDashboardService {
  getSales(
    userId: string,
    dateRangeDto: DateRangeDto,
  ): Promise<IHistoryResponse<Sale>>;

  getIncomes(
    userId: string,
    dateRangeDto: DateRangeDto,
    type?: string,
  ): Promise<IHistoryResponse<Income>>;

  getExpenses(
    userId: string,
    dateRangeDto: DateRangeDto,
    type?: string,
  ): Promise<IHistoryResponse<Expense>>;

  getDashboardCategories(
    userId: string,
    dateRangeDto: DateRangeDto,
  ): Promise<IIncomesANDExpenses>;

  getFavoritesIngredients(
    userId: string,
    dateRangeDto: DateRangeDto,
  ): Promise<FavoriteIngredient[]>;

  getDashboardGraphDatas(
    userId: string,
    dateRangeDto: DateRangeDto,
  ): Promise<IIncomesANDExpenses>;
}
