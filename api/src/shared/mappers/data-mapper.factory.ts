import { IDataMapper } from './interfaces/data-mapper.interface';

export abstract class IDataMapperFactory<TPersistenceEntity, TDomainEntity> {
  protected dataMappers = new Map<
    string,
    IDataMapper<TPersistenceEntity, TDomainEntity>
  >();

  abstract getInstance(
    token: string,
  ): IDataMapper<TPersistenceEntity, TDomainEntity>;
}
