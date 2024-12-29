import { memoryStorage } from 'multer';

import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UsersModule } from '../users/users.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage(),
    }),
    UsersModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
