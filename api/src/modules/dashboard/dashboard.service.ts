import { Inject, Injectable } from '@nestjs/common';

import { IHistoryResponse, IIncomesANDExpenses } from './types';

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

    return this.formatHistoryResponse({
      data: sales,
      type: 'quantity',
    });
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
    TEntity extends { date: string; value: number; quantity?: number },
  >({
    data,
    type = 'amount',
  }: {
    data: TEntity[];
    type?: 'amount' | 'quantity';
  }): IHistoryResponse<TEntity> {
    const history = new Map<string, Map<string, TEntity[]>>();
    let amount = 0;
    let quantity = 0;

    data.forEach((item) => {
      const dateObj = new Date(item.date);
      const monthYear = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}`;
      const day = dateObj.getDate().toString().padStart(2, '0');

      if (!history.has(monthYear)) {
        history.set(monthYear, new Map());
      }

      const monthMap = history.get(monthYear)!;
      if (!monthMap.has(day)) {
        monthMap.set(day, []);
      }

      amount += item.value;
      quantity += item.quantity ?? 0;
      monthMap.get(day)!.push(item);
    });

    // Converter Map para array de objetos mantendo a ordem
    const orderedHistory = Array.from(history.entries()).map(
      ([monthYear, daysMap]) => ({
        monthYear,
        days: Array.from(daysMap.entries()).map(([day, items]) => ({
          day,
          items,
        })),
      }),
    );

    return {
      total: type === 'amount' ? amount : quantity,
      history: orderedHistory,
    };
  }
}
