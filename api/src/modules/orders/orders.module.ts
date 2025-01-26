import { Module } from '@nestjs/common';
import { OrderItemsModule } from '../order-items/order-items.module';
import { UsersModule } from '../users/users.module';
import { IOrdersService } from './interfaces/orders-service.interface';
import { IValidateOrderOwnershipService } from './interfaces/validate-order-ownership-service.interface';
import { OrdersController } from './orders.controllers';
import { OrdersService } from './services/orders.service';
import { ValidateOrderOwnershipService } from './services/validade-order-ownership.service';

@Module({
  imports: [UsersModule, OrderItemsModule],
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
