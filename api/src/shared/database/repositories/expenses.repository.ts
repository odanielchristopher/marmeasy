import { Injectable } from '@nestjs/common';
import { Expense } from 'src/modules/expenses/entities/expense.entity';
import {
  CreateExpenseDto,
  DeleteExpenseDto,
  FindOneExpenseDto,
  IExpensesRepository,
  UpdateExpenseDto,
} from '../interfaces/expenses-repository.interface';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ExpensesRepository implements IExpensesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findOneByUserId(findOneDto: FindOneExpenseDto): Promise<Expense> {
    throw new Error('Method not implemented.');
  }
  create(createDto: CreateExpenseDto): Promise<Expense> {
    throw new Error('Method not implemented.');
  }
  update(updateDto: UpdateExpenseDto): Promise<Expense> {
    throw new Error('Method not implemented.');
  }
  delete(deleteDto: DeleteExpenseDto): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
