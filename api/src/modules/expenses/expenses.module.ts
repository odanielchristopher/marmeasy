import { Module } from '@nestjs/common';
import { ExpensesController } from './expenses.controller';
import { IExpensesService } from './interfaces/expenses-service.interface';
import { ExpensesService } from './services/expenses.service';

@Module({
  controllers: [ExpensesController],
  providers: [
    {
      provide: IExpensesService,
      useClass: ExpensesService,
    },
  ],
})
export class ExpensesModule {}
