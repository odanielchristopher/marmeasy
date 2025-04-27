import { Global, Module } from '@nestjs/common';

import { IIngredientsRepository } from './interfaces/ingredients-repository.interface';
import { IProductCategoriesRepository } from './interfaces/product-categories-repository.interface';
import { IProductsRepository } from './interfaces/products-repository.interface';
import { IUsersRepository } from './interfaces/users-repository.interface';

import { MappersModule } from '../mappers/mappers.module';
import { ICustomersRepository } from './interfaces/customers-repository.interface';
import { IExpensesRepository } from './interfaces/expenses-repository.interface';
import { IIncomesRepository } from './interfaces/incomes-repository.interface';
import { IPaymentsRepository } from './interfaces/payments-repository.interface';
import { PrismaService } from './prisma.service';
import { CustomersRepository } from './repositories/customers.repository';
import { ExpensesRepository } from './repositories/expenses.repository';
import { IncomesRepository } from './repositories/incomes.repository';
import { IngredientsRepository } from './repositories/ingredients.repository';
import { PaymentsRepository } from './repositories/payments.repository';
import { ProductCategoriesRepository } from './repositories/product-categories.repository';
import { ProductsRepository } from './repositories/products.repository';
import { UsersRepository } from './repositories/users.repository';

@Global()
@Module({
  imports: [MappersModule],
  providers: [
    PrismaService,
    {
      provide: IProductsRepository,
      useClass: ProductsRepository,
    },
    {
      provide: IUsersRepository,
      useClass: UsersRepository,
    },
    {
      provide: IProductCategoriesRepository,
      useClass: ProductCategoriesRepository,
    },
    {
      provide: IIngredientsRepository,
      useClass: IngredientsRepository,
    },
    {
      provide: IPaymentsRepository,
      useClass: PaymentsRepository,
    },
    {
      provide: IExpensesRepository,
      useClass: ExpensesRepository,
    },
    {
      provide: IIncomesRepository,
      useClass: IncomesRepository,
    },
    {
      provide: ICustomersRepository,
      useClass: CustomersRepository,
    },
  ],
  exports: [
    PrismaService,
    IProductsRepository,
    IUsersRepository,
    IProductCategoriesRepository,
    IIngredientsRepository,
    IPaymentsRepository,
    IExpensesRepository,
    IIncomesRepository,
    ICustomersRepository,
  ],
})
export class DatabaseModule {}
