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
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerType } from './entities/customer.entity';
import { ICustomersService } from './interfaces/customers-service.interface';

@Controller('customers')
export class CustomersController {
  constructor(
    @Inject(ICustomersService)
    private readonly customersService: ICustomersService,
  ) {}

  @Get()
  findAll(
    @ActiveUserId() userId: string,
    @Query('order') order: string,
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('type') customerType?: CustomerType,
  ) {
    return this.customersService.findAll(userId, {
      order,
      page: page || 1,
      perPage: perPage || 24,
      customerType,
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

  @Put(':customerId')
  update(
    @ActiveUserId() userId: string,
    @Param('customerId', ParseUUIDPipe) customerId: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(userId, customerId, updateCustomerDto);
  }

  @Delete(':customerId')
  delete(
    @ActiveUserId() userId: string,
    @Param('customerId', ParseUUIDPipe) customerId: string,
  ) {
    return this.customersService.delete(userId, customerId);
  }
}
