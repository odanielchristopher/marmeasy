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
import { CreateOrderItemDto } from './dto/create-order-items.dto';
import { OrderItemsService } from './services/order-items.service';

@Controller('items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}


  // @Post(':orderId')
  // create(
  //   @ActiveUserId() userId: string,
  //   @Param('orderId', ParseUUIDPipe) orderId: string,
  //   @Body() createOrderItemsDto: CreateOrderItemDto,
  // ) {
  //   return this.orderItemsService.create(userId, orderId, createOrderItemsDto);
  // }

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.orderItemsService.findAll(userId);
  }

  @Get('/:orderItemId')
  findOne(
    @ActiveUserId() userId: string,
    @Param('orderItemId', ParseUUIDPipe) orderItemId: string,
  ) {
    return this.orderItemsService.findOneById(userId, orderItemId);
  }

  @Delete('/:orderItemId')
  delete(
    @ActiveUserId() userId: string,
    @Param('orderItemId', ParseUUIDPipe) orderItemId: string,
  ) {
    return this.orderItemsService.delete(userId, orderItemId);
  }
}
