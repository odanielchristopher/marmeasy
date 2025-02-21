import { Module } from '@nestjs/common';

import {
  ClientMapperFactory,
  IClientMapperFactory,
} from './factories/client-mapper.factory';
import {
  ExpenseMapperFactory,
  IExpenseMapperFactory,
} from './factories/expense-mapper.factory';
import {
  FavoriteIngredientMapperFactory,
  IFavoriteIngredientMapperFactory,
} from './factories/favorite-ingredient-mapper.factory';
import {
  IIncomeMapperFactory,
  IncomeMapperFactory,
} from './factories/income-mapper.factory';
import {
  IOrderMapperFactory,
  OrderMapperFactory,
} from './factories/order-mapper.factory';
import {
  IPartialIncomeMapperFactory,
  PartialIncomeMapperFactory,
} from './factories/partial-income-mapper.factory';
import {
  IPaymentMapperFactory,
  PaymentMapperFactory,
} from './factories/payment-mapper.factory';
import {
  ISaleMapperFactory,
  SaleMapperFactory,
} from './factories/sale-mapper.factory';

@Module({
  providers: [
    {
      provide: ISaleMapperFactory,
      useClass: SaleMapperFactory,
    },
    {
      provide: IIncomeMapperFactory,
      useClass: IncomeMapperFactory,
    },
    {
      provide: IExpenseMapperFactory,
      useClass: ExpenseMapperFactory,
    },
    {
      provide: IFavoriteIngredientMapperFactory,
      useClass: FavoriteIngredientMapperFactory,
    },
    {
      provide: IPartialIncomeMapperFactory,
      useClass: PartialIncomeMapperFactory,
    },
    {
      provide: IOrderMapperFactory,
      useClass: OrderMapperFactory,
    },
    {
      provide: IPaymentMapperFactory,
      useClass: PaymentMapperFactory,
    },
    {
      provide: IClientMapperFactory,
      useClass: ClientMapperFactory,
    },
  ],
  exports: [
    ISaleMapperFactory,
    IIncomeMapperFactory,
    IExpenseMapperFactory,
    IFavoriteIngredientMapperFactory,
    IPartialIncomeMapperFactory,
    IOrderMapperFactory,
    IPaymentMapperFactory,
    IClientMapperFactory,
  ],
})
export class MappersModule {}
