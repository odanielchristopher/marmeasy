import { Constructor } from 'src/shared/types';
import { ClientMapper } from '../classes/client.mapper';
import { ExpenseMapper } from '../classes/expense.mapper';
import { FavoriteIngredientMapper } from '../classes/favorite-ingredient.mapper';
import { IncomeMapper } from '../classes/income.mapper';
import { OrderMapper } from '../classes/order.mapper';
import { PartialIncomeMapper } from '../classes/partial-income.mapper';
import { PaymentMapper } from '../classes/payment.mapper';
import { SaleMapper } from '../classes/sale.mapper';
import { IDataMapper } from '../interfaces/data-mapper.interface';

import { IDataMappersFactory } from '../interfaces/data-mappers-factory.interface';

export enum DataMapperType {
  SALE = 'SaleMapper',
  EXPENSE = 'ExpenseMapper',
  ORDER = 'OrderMapper',
  INCOME = 'IncomeMapper',
  PAYMENT = 'PaymentMapper',
  FAVORITE = 'FavoriteIngredientMapper',
  PARTIAL_INCOME = 'PartialIncomeMapper',
  CLIENT = 'ClientMapper',
}

export class DataMappersFactory implements IDataMappersFactory {
  private dataMappers = new Map<
    DataMapperType,
    Constructor<IDataMapper<any, any>>
  >();

  constructor() {
    this.dataMappers.set(DataMapperType.SALE, SaleMapper);
    this.dataMappers.set(DataMapperType.EXPENSE, ExpenseMapper);
    this.dataMappers.set(DataMapperType.ORDER, OrderMapper);
    this.dataMappers.set(DataMapperType.INCOME, IncomeMapper);
    this.dataMappers.set(DataMapperType.CLIENT, ClientMapper);
    this.dataMappers.set(DataMapperType.PAYMENT, PaymentMapper);

    this.dataMappers.set(DataMapperType.PARTIAL_INCOME, PartialIncomeMapper);
    this.dataMappers.set(DataMapperType.FAVORITE, FavoriteIngredientMapper);
  }

  getInstance<TPersistenceObject, TDomainEntity>(
    token: DataMapperType,
  ): IDataMapper<TPersistenceObject, TDomainEntity> {
    const implementation = this.dataMappers.get(token);

    return new implementation();
  }
}
