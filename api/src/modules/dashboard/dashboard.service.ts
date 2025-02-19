import { Inject, Injectable } from '@nestjs/common';

import { IHistory, IHistoryResponse, IIncomesANDExpenses } from './types';

import { IExpensesRepository } from 'src/shared/database/interfaces/expenses-repository.interface';
import { IDashboardService } from './interfaces/dashboard-service.interface';

import { IIncomesRepository } from 'src/shared/database/interfaces/incomes-repository.interface';
import { IOrdersRepository } from 'src/shared/database/interfaces/orders-repository.interface';
import { DateRangeDto } from 'src/shared/dto/date-range.dto';
import { Expense, ExpenseType } from '../expenses/entities/expense.entity';
import { PaymentType } from '../payments/entities/payment.entity';
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

  async getExpenses(
    userId: string,
    dateRange: DateRangeDto,
    type?: string,
  ): Promise<IHistoryResponse<Expense>> {
    const expenses = await this.expensesRepository.findManyInGroupByUserId({
      userId,
      dateRange,
      type: ExpenseType[type?.toUpperCase()],
    });

    return this.formatHistoryResponse({ data: expenses });
  }

  async getIncomes(
    userId: string,
    dateRange: DateRangeDto,
    type: string,
  ): Promise<IHistoryResponse<Income>> {
    const incomes = await this.incomesRepository.findManyInGroupByUserId({
      userId,
      dateRange,
      type: PaymentType[type?.toUpperCase()],
    });

    return this.formatHistoryResponse({ data: incomes });
  }

  async getSales(
    userId: string,
    dateRange: DateRangeDto,
  ): Promise<IHistoryResponse<Sale>> {
    const sales = await this.ordersRepository.findManyOnSaleFormat({
      userId,
      dateRange,
    });

    return this.formatHistoryResponse({ data: sales, type: 'length' });
  }

  getFavoritesIngredients(
    userId: string,
    dateRange: DateRangeDto,
  ): Promise<FavoriteIngredient[]> {
    return this.ordersRepository.findFavoriteIngredients({ userId, dateRange });
  }

  async getDashboardCategories(
    userId: string,
    dateRange: DateRangeDto,
  ): Promise<IIncomesANDExpenses> {
    const expenses = await this.expensesRepository.findManyByCategory({
      userId,
      dateRange,
    });

    const incomes = await this.incomesRepository.findManyInGroupByCategory({
      userId,
      dateRange,
    });

    return {
      expenses,
      incomes,
    };
  }

  async getDashboardGraphDatas(
    userId: string,
    dateRange: DateRangeDto,
  ): Promise<IIncomesANDExpenses> {
    const expenses = await this.expensesRepository.findManyByUser({
      userId,
      dateRange,
    });

    const incomes = await this.incomesRepository.findManyByUser({
      userId,
      dateRange,
    });

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
