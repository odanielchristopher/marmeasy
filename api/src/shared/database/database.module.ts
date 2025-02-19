import { Global, Module } from '@nestjs/common';

import { IClientsRepository } from './interfaces/clients-repository.interface';
import { IIngredientsRepository } from './interfaces/ingredients-repository.interface';
import { IOrderItemsRepository } from './interfaces/orders-item-repository.interface';
import { IProductCategoriesRepository } from './interfaces/product-categories-repository.interface';
import { IProductsRepository } from './interfaces/products-repository.interface';
import { IUsersRepository } from './interfaces/users-repository.interface';

import { MappersModule } from '../mappers/mappers.module';
import { IExpensesRepository } from './interfaces/expenses-repository.interface';
import { IIncomesRepository } from './interfaces/incomes-repository.interface';
import { IOrdersRepository } from './interfaces/orders-repository.interface';
import { IPaymentsRepository } from './interfaces/payments-repository.interface';
import { PrismaService } from './prisma.service';
import { ClientsRepository } from './repositories/clients.repository';
import { ExpensesRepository } from './repositories/expenses.repository';
import { IncomesRepository } from './repositories/incomes.repository';
import { IngredientsRepository } from './repositories/ingredients.repository';
import { OrderItemsRepository } from './repositories/order-items.repository';
import { OrdersRepository } from './repositories/orders.repository';
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
      provide: IClientsRepository,
      useClass: ClientsRepository,
    },
    {
      provide: IOrderItemsRepository,
      useClass: OrderItemsRepository,
    },
    {
      provide: IOrdersRepository,
      useClass: OrdersRepository,
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
  ],
  exports: [
    PrismaService,
    IProductsRepository,
    IUsersRepository,
    IProductCategoriesRepository,
    IIngredientsRepository,
    IClientsRepository,
    IOrderItemsRepository,
    IOrdersRepository,
    IPaymentsRepository,
    IExpensesRepository,
    IIncomesRepository,
  ],
})
export class DatabaseModule {}
