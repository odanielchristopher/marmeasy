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

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(IOrdersService) private readonly ordersService: IOrdersService,
  ) {}

  @Get(':clientId')
  findAll(
    @ActiveUserId() userId: string,
    @Param('clientId', ParseUUIDPipe) clientId: string,
  ) {
    return this.ordersService.findAllByClientId(userId, clientId);
  }

  @Get(':clientId/date')
  findAllByDate(
    @ActiveUserId() userId: string,
    @Param('clientId', ParseUUIDPipe) clientId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.ordersService.findAllByDateRange(
      userId,
      clientId,
      new Date(startDate),
      new Date(endDate),
    );
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
