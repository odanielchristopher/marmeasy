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
} from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
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
  ) {
    return this.paymentsService.findAllByClientId(userId, clientId);
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
