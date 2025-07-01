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
import { DateRangeDto } from 'src/shared/dto/date-range.dto';
import { PaginatedAndOrderedQueryDto } from '../orders/dto/filters.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { IPaymentsService } from './interfaces/payments-service.interface';

@Controller('payments')
export class PaymentsController {
  constructor(
    @Inject(IPaymentsService)
    private readonly paymentsService: IPaymentsService,
  ) {}

  @Get(':clientId')
  findAll(
    @ActiveUserId() userId: string,
    @Param('clientId', ParseUUIDPipe) clientId: string,
    @Query() filters: PaginatedAndOrderedQueryDto,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    const dateRange = from && to ? new DateRangeDto({ from, to }) : undefined;

    return this.paymentsService.findAllByCustomerId(userId, clientId, {
      dateRange,
      ...filters,
    });
  }

  @Post('')
  create(
    @ActiveUserId() userId: string,
    @Body() createPaymentDto: CreatePaymentDto,
  ) {
    return this.paymentsService.create(userId, createPaymentDto);
  }

  @Put(':paymentId')
  update(
    @ActiveUserId() userId: string,
    @Param('paymentId', ParseUUIDPipe) paymentId: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    return this.paymentsService.update(userId, paymentId, updatePaymentDto);
  }

  @Delete(':paymentId')
  remove(
    @ActiveUserId() userId: string,
    @Param('paymentId') paymentId: string,
  ) {
    return this.paymentsService.remove(userId, paymentId);
  }
}
