import {
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { IOrderItemsService } from './interfaces/order-items-service.interface';

@Controller('items')
export class OrderItemsController {
  constructor(
    @Inject(IOrderItemsService)
    private readonly orderItemsService: IOrderItemsService,
  ) {}

  @Get(':orderId')
  findAll(
    @ActiveUserId() userId: string,
    @Param('orderId', ParseUUIDPipe) orderId: string,
  ) {
    return this.orderItemsService.findAllByOrder(userId, orderId);
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
