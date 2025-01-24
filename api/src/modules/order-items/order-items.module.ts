import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { OrderItemsController } from './order-items.controllers';
import { OrderItemsService } from './services/order-items.service';
import {} from '@nestjs/testing';
import { ValidateOrderItemsOwnershipService } from './services/validate-product-order-item.service';

@Module({
  imports: [UsersModule],
  controllers: [OrderItemsController],
  providers: [OrderItemsService, ValidateOrderItemsOwnershipService],
  exports: [OrderItemsService],
})
export class OrderItemsModule {}
