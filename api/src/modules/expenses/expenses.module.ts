import { Module } from '@nestjs/common';
import { ExpensesController } from './expenses.controller';
import { IExpensesService } from './interfaces/expenses-service.interface';
import { IValidateExpenseOwnershipService } from './interfaces/validate-expense-ownership-service.interface';
import { ExpensesService } from './services/expenses.service';
import { ValidateExpenseOwnershipService } from './services/validate-expense-ownership.service';

@Module({
  controllers: [ExpensesController],
  providers: [
    {
      provide: IExpensesService,
      useClass: ExpensesService,
    },
    {
      provide: IValidateExpenseOwnershipService,
      useClass: ValidateExpenseOwnershipService,
    },
  ],
})
export class ExpensesModule {}
