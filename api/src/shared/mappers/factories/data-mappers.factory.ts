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
  private dataMappers = new Map<DataMapperType, IDataMapper<any, any>>();

  constructor() {
    this.dataMappers.set(DataMapperType.SALE, SaleMapper.getInstance());
    this.dataMappers.set(DataMapperType.EXPENSE, ExpenseMapper.getInstance());
    this.dataMappers.set(DataMapperType.ORDER, OrderMapper.getInstance());
    this.dataMappers.set(DataMapperType.INCOME, IncomeMapper.getInstance());
    this.dataMappers.set(DataMapperType.CLIENT, ClientMapper.getInstance());
    this.dataMappers.set(DataMapperType.PAYMENT, PaymentMapper.getInstance());

    this.dataMappers.set(
      DataMapperType.PARTIAL_INCOME,
      PartialIncomeMapper.getInstance(),
    );
    this.dataMappers.set(
      DataMapperType.FAVORITE,
      FavoriteIngredientMapper.getInstance(),
    );
  }

  getInstance<TPersistenceObject, TDomainEntity>(
    token: DataMapperType,
  ): IDataMapper<TPersistenceObject, TDomainEntity> {
    return this.dataMappers.get(token);
  }
}
