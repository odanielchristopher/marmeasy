import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { IOrdersService } from './interfaces/orders-service.interface';
import { DateRangeDto } from './dto/date-range-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(IOrdersService) private readonly ordersService: IOrdersService,
  ) {}

  @Get('/date')
  findAllByDate(
    @ActiveUserId() userId: string,
    @Query() dateRangeDto: DateRangeDto,
  ) {
    return this.ordersService.findAllByDateRange(userId, dateRangeDto);
  }

  @Get(':clientId')
  findAll(
    @ActiveUserId() userId: string,
    @Param('clientId', ParseUUIDPipe) clientId: string,
  ) {
    return this.ordersService.findAllByClientId(userId, clientId);
  }

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.ordersService.create(userId, createOrderDto);
  }

  @Put('/:orderId')
  update(
    @ActiveUserId() userId: string,
    @Param('orderId', ParseUUIDPipe) orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(userId, orderId, updateOrderDto);
  }

  @Delete(':orderId')
  delete(
    @ActiveUserId() userId: string,
    @Param('orderId', ParseUUIDPipe) orderId: string,
  ) {
    return this.ordersService.delete(userId, orderId);
  }
}
