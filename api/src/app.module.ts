import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthGuard } from './modules/auth/auth.guard';
import { AuthModule } from './modules/auth/auth.module';
import { ClientsModule } from './modules/clients/clients.module';
import { IngredientsModule } from './modules/ingredients/ingredients.module';
import { ProductCategoriesModule } from './modules/product-categories/product-categories.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './shared/database/database.module';
import { OrderItemsModule } from './modules/order-items/order-items.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    AuthModule,
    ClientsModule,
    ProductCategoriesModule,
    ProductsModule,
    IngredientsModule,
    OrderItemsModule,
    OrdersModule,
    PaymentsModule,
    DashboardModule,
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
