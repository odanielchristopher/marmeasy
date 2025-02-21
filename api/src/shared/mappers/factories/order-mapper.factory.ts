import { Order } from 'src/modules/orders/entities/order.entity';
import { OrderMapper, PrismaOrderResponse } from '../classes/order.mapper';
import { IDataMapperFactory } from '../interfaces/data-mapper-factory.interface';
import { IDataMapper } from '../interfaces/data-mapper.interface';

export const IOrderMapperFactory = Symbol('IOrderMapperFactory');

export class OrderMapperFactory
  implements IDataMapperFactory<PrismaOrderResponse, Order>
{
  getInstance(): IDataMapper<PrismaOrderResponse, Order> {
    return OrderMapper.getInstance();
  }
}
