import { IDataMapper } from './data-mapper.interface';

export interface IDataMapperFactory<TPersistenceObject, TDomainEntity> {
  getInstance(): IDataMapper<TPersistenceObject, TDomainEntity>;
}
