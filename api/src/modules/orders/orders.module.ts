import { Module } from '@nestjs/common';
import { IOrdersService } from './interfaces/orders-service.interface';
import { OrdersController } from './orders.controller';
import { OrdersService } from './services/orders.service';
import { ProductsModule } from '../products/products.module';
import { CustomersModule } from '../customers/customers.module';

@Module({
  imports: [ProductsModule, CustomersModule],
  controllers: [OrdersController],
  providers: [
    {
      provide: IOrdersService,
      useClass: OrdersService,
    },
  ],
})
export class OrdersModule {}
