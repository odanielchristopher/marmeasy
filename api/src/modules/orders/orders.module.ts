import { Module } from '@nestjs/common';
import { IOrdersService } from './interfaces/orders-service.interface';
import { OrdersController } from './orders.controller';
import { OrdersService } from './services/orders.service';
import { ProductsModule } from '../products/products.module';
import { CustomersModule } from '../customers/customers.module';
import { ValidateOrderService } from './services/validate-order.service';
import { IValidateOrdersService } from './interfaces/validate-order-service.interface';
import { ComputeCustomerOwnershipService } from './services/compute-balance-customer.service';
import { ValidateOrderCustomerOwnershipService } from './services/validate-order-customer-onwership.service';

@Module({
  imports: [ProductsModule, CustomersModule],
  controllers: [OrdersController],
  providers: [
    {
      provide: IOrdersService,
      useClass: OrdersService,
    },
    {
      provide: IValidateOrdersService,
      useClass: ValidateOrderService,
    },
    ComputeCustomerOwnershipService,
    ValidateOrderCustomerOwnershipService,
  ],
})
export class OrdersModule {}
