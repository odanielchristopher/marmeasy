import { Income } from 'src/modules/dashboard/entities/income.entity';
import {
  PartialIncomeMapper,
  PrismaPaymentWithClientName,
} from '../classes/partial-income.mapper';
import { IDataMapperFactory } from '../interfaces/data-mapper-factory.interface';
import { IDataMapper } from '../interfaces/data-mapper.interface';

export const IPartialIncomeMapperFactory = Symbol(
  'IPartialIncomeMapperFactory',
);

export class PartialIncomeMapperFactory
  implements
    IDataMapperFactory<Partial<PrismaPaymentWithClientName>, Partial<Income>>
{
  getInstance(): IDataMapper<
    Partial<PrismaPaymentWithClientName>,
    Partial<Income>
  > {
    return PartialIncomeMapper.getInstance();
  }
}
