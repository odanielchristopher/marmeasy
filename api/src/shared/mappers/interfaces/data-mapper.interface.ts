export interface IDataMapper<TPersistenceEntity, TDomainEntity> {
  toDomain(persistenceObject: TPersistenceEntity): TDomainEntity;
}
