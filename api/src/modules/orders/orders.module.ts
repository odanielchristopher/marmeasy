import { Module } from '@nestjs/common';
import { IOrdersService } from './interfaces/orders-service.interface';
import { OrdersController } from './orders.controller';
import { OrdersService } from './services/orders.service';

@Module({
  imports: [],
  controllers: [OrdersController],
  providers: [
    {
      provide: IOrdersService,
      useClass: OrdersService,
    },
  ],
})
export class OrdersModule {}
