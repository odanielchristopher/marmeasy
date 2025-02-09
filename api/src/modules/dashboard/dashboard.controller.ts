import { Controller, Get, Inject } from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { IDashboardService } from './interfaces/dashboard-service.interface';

@Controller('dashboard')
export class DashboardController {
  constructor(
    @Inject(IDashboardService)
    private readonly dashboardService: IDashboardService,
  ) {}

  @Get('/incomes')
  getIncomes(@ActiveUserId() userId: string) {
    return this.dashboardService.getIncomes(userId);
  }

  @Get('/expenses')
  getExpenses(@ActiveUserId() userId: string) {
    return this.dashboardService.getExpenses(userId);
  }

  @Get('/sales')
  getSales(@ActiveUserId() userId: string) {
    return this.dashboardService.getSales(userId);
  }

  @Get('/favorites')
  getFavorites(@ActiveUserId() userId: string) {
    return this.dashboardService.getFavoritesIngredients(userId);
  }

  @Get('/categories')
  getCategories(@ActiveUserId() userId: string) {
    return this.dashboardService.getDashboardCategories(userId);
  }

  @Get('/graph-datas')
  getGraphData(@ActiveUserId() userId: string) {
    return this.dashboardService.getDashboardGraphDatas(userId);
  }
}
