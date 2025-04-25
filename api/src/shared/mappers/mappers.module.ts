import { Module } from '@nestjs/common';

import { DataMappersFactory } from './factories/data-mappers.factory';
import { IDataMappersFactory } from './interfaces/data-mappers-factory.interface';

@Module({
  providers: [
    {
      provide: IDataMappersFactory,
      useClass: DataMappersFactory,
    },
  ],
  exports: [IDataMappersFactory],
})
export class MappersModule {}
