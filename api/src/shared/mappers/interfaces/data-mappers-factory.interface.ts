import { DataMapperType } from '../factories/data-mappers.factory';
import { IDataMapper } from './data-mapper.interface';

export const IDataMappersFactory = Symbol('IDataMappersFactory');

export interface IDataMappersFactory {
  getInstance<TPersistenceObject, TDomainEntity>(
    token: DataMapperType,
  ): IDataMapper<TPersistenceObject, TDomainEntity>;
}
