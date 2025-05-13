import { Constructor } from 'src/shared/types';
import { ExpenseMapper } from '../classes/expense.mapper';
import { IncomeMapper } from '../classes/income.mapper';
import { PartialIncomeMapper } from '../classes/partial-income.mapper';
import { PaymentMapper } from '../classes/payment.mapper';
import { IDataMapper } from '../interfaces/data-mapper.interface';

import { CustomerMapper } from '../classes/customer.mapper';
import { IDataMappersFactory } from '../interfaces/data-mappers-factory.interface';

export enum DataMapperType {
  SALE = 'SaleMapper',
  EXPENSE = 'ExpenseMapper',
  INCOME = 'IncomeMapper',
  PAYMENT = 'PaymentMapper',
  PARTIAL_INCOME = 'PartialIncomeMapper',
  CUSTOMER = 'CustomerMapper',
}

export class DataMappersFactory implements IDataMappersFactory {
  private dataMappers = new Map<
    DataMapperType,
    Constructor<IDataMapper<any, any>>
  >();

  constructor() {
    this.dataMappers.set(DataMapperType.EXPENSE, ExpenseMapper);
    this.dataMappers.set(DataMapperType.INCOME, IncomeMapper);
    this.dataMappers.set(DataMapperType.PAYMENT, PaymentMapper);

    this.dataMappers.set(DataMapperType.PARTIAL_INCOME, PartialIncomeMapper);
    this.dataMappers.set(DataMapperType.CUSTOMER, CustomerMapper);
  }

  getInstance<TPersistenceObject, TDomainEntity>(
    token: DataMapperType,
  ): IDataMapper<TPersistenceObject, TDomainEntity> {
    const implementation = this.dataMappers.get(token);

    return new implementation();
  }
}
