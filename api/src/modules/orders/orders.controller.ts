import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { DateRangeDto } from 'src/shared/dto/date-range.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  FilterPaginatedDto,
  PaginatedAndOrderedQueryDto,
} from './dto/filters.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { IOrdersService } from './interfaces/orders-service.interface';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(IOrdersService)
    private readonly ordersService: IOrdersService,
  ) {}

  @Get()
  findAllByUserId(
    @ActiveUserId() userId: string,
    @Query() filters: FilterPaginatedDto,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    const dateRange = from && to ? new DateRangeDto({ from, to }) : undefined;

    return this.ordersService.findAllByUserId(userId, {
      ...filters,
      dateRange,
    });
  }

  @Get(':orderId')
  findOneById(
    @ActiveUserId() userId: string,
    @Param('orderId') orderId: string,
  ) {
    return this.ordersService.findOneById(userId, orderId);
  }

  @Get('/customer/:customerId')
  findAllByCustomerId(
    @ActiveUserId() userId: string,
    @Param('customerId') customerId: string,
    @Query() { order, page, perPage }: PaginatedAndOrderedQueryDto,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    const dateRange = from && to ? new DateRangeDto({ from, to }) : undefined;

    return this.ordersService.findAllByCustomerId(userId, customerId, {
      order,
      page,
      perPage,
      dateRange,
    });
  }

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.ordersService.create(userId, createOrderDto);
  }

  @Put(':orderId')
  update(
    @ActiveUserId() userId: string,
    @Param('orderId') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(userId, orderId, updateOrderDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':orderId')
  delete(@ActiveUserId() userId: string, @Param('orderId') orderId: string) {
    return this.ordersService.delete(userId, orderId);
  }
}
