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

@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}


  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createOrderItemsDto: CreateOrderItemDto,
  ) {
    return this.orderItemsService.create(userId, createOrderItemsDto);
  }
}
