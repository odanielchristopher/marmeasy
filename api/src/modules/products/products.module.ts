import { memoryStorage } from 'multer';

import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UsersModule } from '../users/users.module';
import { ProductsController } from './products.controller';
import { ProducImagesService } from './services/product-images.service';
import { ProductsService } from './services/products.service';
import { ValidateProductOwnershipService } from './services/validate-product-ownership.service';

@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage(),
    }),
    UsersModule,
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProducImagesService,
    ValidateProductOwnershipService,
  ],
})
export class ProductsModule {}
