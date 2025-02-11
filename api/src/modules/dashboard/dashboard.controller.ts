import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { makeDateRangeDto } from 'src/shared/factories/date-range-dto.factory';
import { IDashboardService } from './interfaces/dashboard-service.interface';

@Controller('dashboard')
export class DashboardController {
  constructor(
    @Inject(IDashboardService)
    private readonly dashboardService: IDashboardService,
  ) {}

  @Get('/incomes')
  getIncomes(
    @ActiveUserId() userId: string,
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('type') type: string,
  ) {
    return this.dashboardService.getIncomes(
      userId,
      makeDateRangeDto({ from, to }),
      type,
    );
  }

  @Get('/expenses')
  getExpenses(
    @ActiveUserId() userId: string,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    return this.dashboardService.getExpenses(
      userId,
      makeDateRangeDto({ from, to }),
    );
  }

  @Get('/sales')
  getSales(
    @ActiveUserId() userId: string,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    return this.dashboardService.getSales(
      userId,
      makeDateRangeDto({ from, to }),
    );
  }

  @Get('/favorites')
  getFavorites(
    @ActiveUserId() userId: string,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    return this.dashboardService.getFavoritesIngredients(
      userId,
      makeDateRangeDto({ from, to }),
    );
  }

  @Get('/categories')
  getCategories(
    @ActiveUserId() userId: string,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    return this.dashboardService.getDashboardCategories(
      userId,
      makeDateRangeDto({ from, to }),
    );
  }

  @Get('/graph-data')
  getGraphData(
    @ActiveUserId() userId: string,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    return this.dashboardService.getDashboardGraphDatas(
      userId,
      makeDateRangeDto({ from, to }),
    );
  }
}
