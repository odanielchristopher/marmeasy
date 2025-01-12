import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { OrdersController } from './orders.controllers';
import { OrdersService } from './services/orders.service';
import { ValidateOrderOwnershipService } from './services/validade-order-ownership.service';

@Module({
  imports: [UsersModule],
  controllers: [OrdersController],
  providers: [OrdersService, ValidateOrderOwnershipService],
})

export class OrdersModule {}