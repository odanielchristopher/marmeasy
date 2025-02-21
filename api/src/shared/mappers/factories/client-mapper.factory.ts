import { Client as PrismaClient } from '@prisma/client';
import { Client } from 'src/modules/clients/entities/client.entity';
import { ClientMapper } from '../classes/client.mapper';
import { IDataMapperFactory } from '../interfaces/data-mapper-factory.interface';
import { IDataMapper } from '../interfaces/data-mapper.interface';

export const IClientMapperFactory = Symbol('IClientMapperFactory');

export class ClientMapperFactory
  implements IDataMapperFactory<PrismaClient, Client>
{
  getInstance(): IDataMapper<PrismaClient, Client> {
    return ClientMapper.getInstance();
  }
}
