import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.customersService.findAll(userId);
  }

  @Get(':customerId')
  findOne(
    @ActiveUserId() userId: string,
    @Param('customerId', ParseUUIDPipe) customerId: string,
  ) {
    return this.customersService.findOne(userId, customerId);
  }

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createCustomerDto: CreateCustomerDto,
  ) {
    return this.customersService.create(userId, createCustomerDto);
  }
}
