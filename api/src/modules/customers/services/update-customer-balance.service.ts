import { Inject, Injectable } from '@nestjs/common';
import { ICustomersRepository } from 'src/shared/database/interfaces/customers-repository.interface';
import { Customer } from '../entities/customer.entity';
import {
  IUpdateCustomerBalanceService,
  UpdateBalanceParams,
} from '../interfaces/update-customer-balance-service.interface';

@Injectable()
export class UpdateCustomerBalanceService
  implements IUpdateCustomerBalanceService
{
  constructor(
    @Inject(ICustomersRepository)
    private readonly customersRepository: ICustomersRepository,
  ) {}

  async update({
    userId,
    customerId,
    newValue,
    previousValue = 0,
    operationType,
  }: UpdateBalanceParams): Promise<Customer> {
    const findedCustomer = await this.customersRepository.findFirstById({
      userId,
      customerId,
    });

    let newBalance = findedCustomer.balance;

    if (operationType === 'DEBIT') {
      newBalance = newBalance + previousValue - newValue;
    } else if (operationType === 'CREDIT') {
      newBalance = newBalance - previousValue + newValue;
    }

    const { name, type, phone, color } = findedCustomer;

    return this.customersRepository.update({
      customerId,
      data: {
        name,
        type,
        phone,
        color,
        balance: newBalance,
      },
    });
  }
}
