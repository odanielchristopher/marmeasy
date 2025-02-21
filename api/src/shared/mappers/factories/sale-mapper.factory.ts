import { Sale } from 'src/modules/dashboard/entities/sale.entity';
import { PrismaSaleResponse, SaleMapper } from '../classes/sale.mapper';
import { IDataMapperFactory } from '../interfaces/data-mapper-factory.interface';
import { IDataMapper } from '../interfaces/data-mapper.interface';

export const ISaleMapperFactory = Symbol('ISaleMapperFactory');

export class SaleMapperFactory
  implements IDataMapperFactory<PrismaSaleResponse, Sale>
{
  getInstance(): IDataMapper<PrismaSaleResponse, Sale> {
    return SaleMapper.getInstance();
  }
}
