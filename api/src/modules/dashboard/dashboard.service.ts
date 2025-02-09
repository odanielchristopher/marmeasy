import { Inject, Injectable } from '@nestjs/common';

import { IHistory, IHistoryResponse, IIncomesANDExpenses } from './types';

import { IExpensesRepository } from 'src/shared/database/interfaces/expenses-repository.interface';
import { IDashboardService } from './interfaces/dashboard-service.interface';

import { IIncomesRepository } from 'src/shared/database/interfaces/incomes-repository.interface';
import { IOrdersRepository } from 'src/shared/database/interfaces/orders-repository.interface';
import { Expense } from '../expenses/entities/expense.entity';
import { FavoriteIngredient } from './entities/favorite.entity';
import { Income } from './entities/income.entity';
import { Sale } from './entities/sale.entity';

@Injectable()
export class DashboardService implements IDashboardService {
  constructor(
    @Inject(IExpensesRepository)
    private readonly expensesRepository: IExpensesRepository,
    @Inject(IIncomesRepository)
    private readonly incomesRepository: IIncomesRepository,
    @Inject(IOrdersRepository)
    private readonly ordersRepository: IOrdersRepository,
  ) {}

  async getExpenses(userId: string): Promise<IHistoryResponse<Expense>> {
    const expenses = await this.expensesRepository.findAllByUserId({ userId });

    return this.formatHistoryResponse({ data: expenses });
  }

  async getIncomes(userId: string): Promise<IHistoryResponse<Income>> {
    const incomes = await this.incomesRepository.findManyByUser({ userId });

    return this.formatHistoryResponse({ data: incomes });
  }

  async getSales(userId: string): Promise<IHistoryResponse<Sale>> {
    const sales = await this.ordersRepository.findManyOnSaleFormat({ userId });

    return this.formatHistoryResponse({ data: sales, type: 'length' });
  }

  getFavoritesIngredients(userId: string): Promise<FavoriteIngredient[]> {
    return this.ordersRepository.findFavoriteIngredients({ userId });
  }

  getDashboardCategories(userId: string): Promise<IIncomesANDExpenses> {
    return this.getIncomesAndExpenses(userId);
  }

  getDashboardGraphDatas(userId: string): Promise<IIncomesANDExpenses> {
    return this.getIncomesAndExpenses(userId);
  }

  // Helpers
  private async getIncomesAndExpenses(userId: string) {
    const expenses = await this.expensesRepository.findAllByUserId({ userId });

    const incomes = await this.incomesRepository.findManyByUser({ userId });

    return {
      expenses,
      incomes,
    };
  }

  private formatHistoryResponse<
    TEntity extends { date: string; value: number },
  >({
    data,
    type = 'amount',
  }: {
    data: TEntity[];
    type?: 'amount' | 'length';
  }): IHistoryResponse<TEntity> {
    const history: IHistory<TEntity> = {};

    let total = 0;

    data.forEach((item) => {
      const dateObj = new Date(item.date);

      const monthYear = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
        .toString()
        .padStart(2, '0')}`;

      const day = dateObj.getDate().toString().padStart(2, '0');

      if (!history[monthYear]) {
        history[monthYear] = {};
      }

      if (!history[monthYear][day]) {
        history[monthYear][day] = [];
      }

      total += item.value;
      history[monthYear][day].push(item);
    });

    return {
      total: type === 'amount' ? total : data.length,
      history,
    };
  }
}
