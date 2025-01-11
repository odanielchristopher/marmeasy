import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { OrderItemsController } from './order-items.controllers';
import { OrderItemsService } from './services/order-items.service';
import {} from '@nestjs/testing'
import { OrderItemsRepository } from 'src/shared/database/repositories/order-items.repository';

@Module({
  imports: [UsersModule],
  controllers: [OrderItemsController],
  providers: [OrderItemsService,],
})

export class OrderItemsModule {}