import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';

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

  @Get(':customerId')
  listAllOrdersByCustomerId(
    @ActiveUserId() userId: string,
    @Param('customerId') customerId: string,
    @Query('order') order: 'asc' | 'desc' = 'desc',
    @Query('page') page: number,
    @Query('per_page') perPage: number,
  ) {
    const validPage = page && page > 0 ? page : 1;
    const validPerPage = perPage && perPage > 0 ? perPage : 10;

    return this.ordersService.listAllOdersByCustomerId(
      userId,
      customerId,
      order,
      validPage,
      validPerPage,
    );
  }

  @Delete(':customerId/:orderId')
  delete(
    @ActiveUserId() userId: string,
    @Param('customerId') customerId: string,
    @Param('orderId') orderId: string,
  ) {
    return this.ordersService.delete(userId, customerId, orderId);
  }
}
