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
import { makeDateRangeDto } from 'src/shared/factories/date-range-dto.factory';
import { makeSearchTermDto } from 'src/shared/factories/search-term-dto.factory';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { IOrdersService } from './interfaces/orders-service.interface';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(IOrdersService) private readonly ordersService: IOrdersService,
  ) {}

  @Get('/search')
  findAllBySearchTerm(
    @ActiveUserId() userId: string,
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('query') searchTerm: string,
  ) {
    return this.ordersService.findAllBySearchTerm({
      userId,
      page,
      perPage,
      dateRange: this.makeDateRange({ from, to }),
      searchTerm: makeSearchTermDto(searchTerm),
    });
  }

  @Get()
  findAll(
    @ActiveUserId() userId: string,
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('page') page: number,
    @Query('perPage') perPage: number,
  ) {
    return this.ordersService.findAllUserId({
      userId,
      page,
      perPage,
      dateRange: this.makeDateRange({ from, to }),
    });
  }

  @Get(':clientId')
  findAlByClient(
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

  @Put(':orderId')
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

  private makeDateRange({ from, to }: { from: string; to: string }) {
    return from && to && makeDateRangeDto({ from, to });
  }
}
