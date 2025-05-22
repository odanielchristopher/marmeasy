import { Body, Controller, Inject, Post } from '@nestjs/common';

import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { IOrdersService } from './interfaces/orders-service.interface';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(IOrdersService)
    private readonly ordersService: IOrdersService,
  ) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.ordersService.create(createOrderDto);
  }
}
