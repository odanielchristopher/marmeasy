import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';

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
    return this.ordersService.create(userId, createOrderDto);
  }

  @Get(':customerId/:orderId')
  findFirstById(
    @ActiveUserId() userId: string,
    @Param('customerId') customerId: string,
    @Param('orderId') orderId: string,
  ) {
    return this.ordersService.findFirstById(userId, customerId, orderId);
  }
}
