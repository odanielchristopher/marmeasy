import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './services/orders.service';
import { UpdateStatusOrderDto } from './dto/update-status-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UpdateQuantityOrderItemDto } from './dto/update-order-item.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.ordersService.findAllByUserId(userId);
  }

  @Get(':orderId')
  findOne(
    @ActiveUserId() userId: string,
    @Param('orderId', ParseUUIDPipe) orderId: string,
  ) {
    return this.ordersService.findOneById(userId, orderId);
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

  @Put('/:orderId/items/:orderItemId')
  updateQuantity(
    @ActiveUserId() userId: string,
    @Param('orderId', ParseUUIDPipe) orderId: string,
    @Param('orderItemId', ParseUUIDPipe) orderItemId: string,
    @Body() updateQuantityOrderItemDto: UpdateQuantityOrderItemDto,
  ) {
    return this.ordersService.updateQuantityItem(userId, orderId, orderItemId, updateQuantityOrderItemDto);
  }
  @Put('/status/:orderId')
  updateStatus(
    @ActiveUserId() userId: string,
    @Param('orderId', ParseUUIDPipe) orderId: string,
    @Body() updateStatusOrderDto: UpdateStatusOrderDto,
  ) {
    return this.ordersService.updateStatus(userId, orderId, updateStatusOrderDto);
  }

  @Delete(':orderId')
  delete(
    @ActiveUserId() userId: string,
    @Param('orderId', ParseUUIDPipe) orderId: string,
  ) {
    return this.ordersService.delete(userId, orderId);
  }

  @Delete(':orderId/items/:orderItemId')
  deleteItem(
    @ActiveUserId() userId: string,
    @Param('orderId', ParseUUIDPipe) orderId: string,
    @Param('orderItemId', ParseUUIDPipe) orderItemId: string,
  ) {
    return this.ordersService.deleteItem(userId, orderId, orderItemId);
  }
}
