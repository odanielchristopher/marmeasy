import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { ICustomersService } from './interfaces/customers-service.interface';
import { IUpdateCustomerBalanceService } from './interfaces/update-customer-balance-service.interface';
import { IValidateCustomerOwnershipService } from './interfaces/validate-customer-ownership-service.interface';
import { CustomersService } from './services/customers.service';
import { UpdateCustomerBalanceService } from './services/update-customer-balance.service';
import { ValidateCustomerOwnershipService } from './services/validate-customer-ownership.service';

@Module({
  controllers: [CustomersController],
  providers: [
    CustomersService,
    ValidateCustomerOwnershipService,
    {
      provide: IValidateCustomerOwnershipService,
      useClass: ValidateCustomerOwnershipService,
    },
    {
      provide: ICustomersService,
      useClass: CustomersService,
    },
    {
      provide: IUpdateCustomerBalanceService,
      useClass: UpdateCustomerBalanceService,
    },
  ],
  exports: [
    ValidateCustomerOwnershipService,
    {
      provide: IValidateCustomerOwnershipService,
      useClass: ValidateCustomerOwnershipService,
    },
    {
      provide: IUpdateCustomerBalanceService,
      useClass: UpdateCustomerBalanceService,
    },
  ],
})
export class CustomersModule {}
