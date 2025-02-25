import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { IOrderItemsService } from './interfaces/order-items-service.interface';
import { IValidateOrderItemsOwnershipService } from './interfaces/validate-order-item-ownership-service.interface';
import { OrderItemsController } from './order-items.controllers';
import { OrderItemsService } from './services/order-items.service';
import { ValidateOrderItemsOwnershipService } from './services/validate-order-item-ownership.service';

@Module({
  imports: [UsersModule],
  controllers: [OrderItemsController],
  providers: [
    {
      provide: IValidateOrderItemsOwnershipService,
      useClass: ValidateOrderItemsOwnershipService,
    },
    {
      provide: IOrderItemsService,
      useClass: OrderItemsService,
    },
  ],
  exports: [
    {
      provide: IOrderItemsService,
      useClass: OrderItemsService,
    },
  ],
})
export class OrderItemsModule {}
