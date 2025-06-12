import { Module } from '@nestjs/common';
import { CustomersModule } from '../customers/customers.module';
import { ProductsModule } from '../products/products.module';
import { IOrdersService } from './interfaces/orders-service.interface';
import { IValidateOrderOwnershipService } from './interfaces/validate-order-ownership-service.interface';
import { OrdersController } from './orders.controller';
import { OrdersService } from './services/orders.service';
import { ValidateOrderOwnershipService } from './services/validate-order-ownership.service';

@Module({
  imports: [ProductsModule, CustomersModule],
  controllers: [OrdersController],
  providers: [
    {
      provide: IOrdersService,
      useClass: OrdersService,
    },
    {
      provide: IValidateOrderOwnershipService,
      useClass: ValidateOrderOwnershipService,
    },
  ],
})
export class OrdersModule {}
