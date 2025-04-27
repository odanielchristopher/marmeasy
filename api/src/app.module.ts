import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthGuard } from './modules/auth/auth.guard';
import { AuthModule } from './modules/auth/auth.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ExpensesModule } from './modules/expenses/expenses.module';
import { IngredientsModule } from './modules/ingredients/ingredients.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ProductCategoriesModule } from './modules/product-categories/product-categories.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './shared/database/database.module';
import { MappersModule } from './shared/mappers/mappers.module';
import { CustomersModule } from './modules/customers/customers.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    AuthModule,
    ProductCategoriesModule,
    ProductsModule,
    IngredientsModule,
    PaymentsModule,
    DashboardModule,
    ExpensesModule,
    MappersModule,
    CustomersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
