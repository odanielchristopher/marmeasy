import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { IExpensesService } from './interfaces/expenses-service.interface';

@Controller('expenses')
export class ExpensesController {
  constructor(
    @Inject(IExpensesService)
    private readonly expensesService: IExpensesService,
  ) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createExpenseDto: CreateExpenseDto,
  ) {
    return this.expensesService.create(userId, createExpenseDto);
  }

  @Put(':expenseId')
  update(
    @ActiveUserId() userId: string,
    @Param('expenseId') expenseId: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expensesService.update(userId, expenseId, updateExpenseDto);
  }

  @Delete(':expenseId')
  remove(
    @ActiveUserId() userId: string,
    @Param('expenseId') expenseId: string,
  ) {
    return this.expensesService.remove(userId, expenseId);
  }
}
