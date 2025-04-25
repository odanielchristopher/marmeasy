import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { IDashboardService } from './interfaces/dashboard-service.interface';

@Module({
  controllers: [DashboardController],
  providers: [{ provide: IDashboardService, useClass: DashboardService }],
})
export class DashboardModule {}
