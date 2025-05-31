import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { ValidateCustomerOwnershipService } from './validate-customer-ownership.service';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService, ValidateCustomerOwnershipService],
  exports: [ValidateCustomerOwnershipService],
})
export class CustomersModule {}
