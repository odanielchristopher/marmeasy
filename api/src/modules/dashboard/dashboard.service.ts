import { Injectable } from '@nestjs/common';
import { Expense } from '@prisma/client';
import { FavoriteIngredient } from './entities/favorite.entity';
import { Income } from './entities/income.entity';
import { Sale } from './entities/sale.entity';
import { IDashboardService } from './interfaces/dashboard-service.interface';
import { IHistoryResponse, IIncomesANDExpenses } from './types';

@Injectable()
export class DashboardService implements IDashboardService {
  getExpenses(): Promise<IHistoryResponse<Expense>> {
    throw new Error('Method not implemented.');
  }
  getSales(): Promise<IHistoryResponse<Sale>> {
    throw new Error('Method not implemented.');
  }
  getIncomes(): Promise<IHistoryResponse<Income>> {
    throw new Error('Method not implemented.');
  }
  getDashboardCategories(): Promise<IIncomesANDExpenses> {
    throw new Error('Method not implemented.');
  }
  getFavoritesIngredients(): Promise<FavoriteIngredient[]> {
    throw new Error('Method not implemented.');
  }
  getDashboardGraphDatas(): Promise<IIncomesANDExpenses> {
    throw new Error('Method not implemented.');
  }
}
