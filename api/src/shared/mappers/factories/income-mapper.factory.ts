import { Payment as PrismaPayment } from '@prisma/client';
import { Income } from 'src/modules/dashboard/entities/income.entity';
import { IncomeMapper } from '../classes/income.mapper';
import { IDataMapperFactory } from '../interfaces/data-mapper-factory.interface';
import { IDataMapper } from '../interfaces/data-mapper.interface';

export const IIncomeMapperFactory = Symbol('IIncomeMapperFactory');

export class IncomeMapperFactory
  implements IDataMapperFactory<Partial<PrismaPayment>, Partial<Income>>
{
  getInstance(): IDataMapper<Partial<PrismaPayment>, Partial<Income>> {
    return IncomeMapper.getInstance();
  }
}
