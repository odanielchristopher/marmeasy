import { Controller, Get, Inject } from '@nestjs/common';
import { IDashboardService } from './interfaces/dashboard-service.interface';

@Controller('dashboard')
export class DashboardController {
  constructor(
    @Inject(IDashboardService)
    private readonly dashboardService: IDashboardService,
  ) {}

  @Get('/incomes')
  getIncomes() {
    return this.dashboardService.getIncomes();
  }

  @Get('/expenses')
  getExpenses() {
    return this.dashboardService.getExpenses();
  }

  @Get('/sales')
  getSales() {
    return this.dashboardService.getSales();
  }

  @Get('/favorites')
  getFavorites() {
    return this.dashboardService.getFavoritesIngredients();
  }

  @Get('/categories')
  getCategories() {
    return this.dashboardService.getDashboardCategories();
  }

  @Get('/graph-datas')
  getGraphData() {
    return this.dashboardService.getDashboardGraphDatas();
  }
}
