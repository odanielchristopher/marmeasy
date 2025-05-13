import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  findAll(
    @ActiveUserId() userId: string,
    @Query('order') order: string,
    @Query('page') page: number,
    @Query('perPage') perPage: number,
  ) {
    return this.customersService.findAll(userId, {
      order,
      page,
      perPage,
    });
  }

  @Get('/search')
  findAllBySearchTerm(
    @ActiveUserId() userId: string,
    @Query('searchTerm') searchTerm: string,
    @Query('order') order: string,
  ) {
    return this.customersService.findAllBySeachTerm(userId, {
      order,
      searchTerm,
    });
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
