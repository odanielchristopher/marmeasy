import { Customer as PrismaCustomer } from '@prisma/client';

import {
  Customer,
  CustomerType,
} from 'src/modules/customers/entities/customer.entity';
import { IDataMapper } from '../interfaces/data-mapper.interface';

export class CustomerMapper implements IDataMapper<PrismaCustomer, Customer> {
  toDomain(persistenceObject: PrismaCustomer): Customer {
    if (!persistenceObject) {
      return null;
    }

    const { id, balance, color, name, phone, type } = persistenceObject;

    return {
      id,
      balance: balance.toNumber(),
      color,
      name,
      phone,
      type: CustomerType[type],
    };
  }
}
