import { Inject, Injectable } from '@nestjs/common';

import { IHistory, IHistoryResponse, IIncomesANDExpenses } from './types';

import { IExpensesRepository } from 'src/shared/database/interfaces/expenses-repository.interface';
import { IDashboardService } from './interfaces/dashboard-service.interface';

import { IIncomesRepository } from 'src/shared/database/interfaces/incomes-repository.interface';
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
  ) {}

  async getExpenses(userId: string): Promise<IHistoryResponse<Expense>> {
    const expenses = await this.expensesRepository.findAllByUserId({ userId });

    return this.formatHistoryResponse(expenses);
  }

  async getIncomes(userId: string): Promise<IHistoryResponse<Income>> {
    const incomes = await this.incomesRepository.findManyByUser({ userId });

    return this.formatHistoryResponse(incomes);
  }

  getSales(userId: string): Promise<IHistoryResponse<Sale>> {
    throw new Error('Method not implemented.');
  }

  getFavoritesIngredients(userId: string): Promise<FavoriteIngredient[]> {
    throw new Error('Method not implemented.');
  }

  async getDashboardCategories(userId: string): Promise<IIncomesANDExpenses> {
    const expenses = await this.expensesRepository.findAllByUserId({ userId });

    const incomes = await this.incomesRepository.findManyByUser({ userId });

    return {
      expenses,
      incomes,
    };
  }

  async getDashboardGraphDatas(userId: string): Promise<IIncomesANDExpenses> {
    const expenses = await this.expensesRepository.findAllByUserId({ userId });

    const incomes = await this.incomesRepository.findManyByUser({ userId });

    return {
      expenses,
      incomes,
    };
  }

  private formatHistoryResponse<
    TEntity extends { date: string; value: number },
  >(data: TEntity[]): IHistoryResponse<TEntity> {
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
      total,
      history,
    };
  }
}
