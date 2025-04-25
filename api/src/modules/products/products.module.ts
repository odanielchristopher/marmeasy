import { memoryStorage } from 'multer';

import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { IngredientsModule } from '../ingredients/ingredients.module';
import { ProductCategoriesModule } from '../product-categories/product-categories.module';
import { UsersModule } from '../users/users.module';
import { IProducImagesService } from './interfaces/product-images-service.interface';
import { IProductsService } from './interfaces/products-service.interface';
import { IValidateProductOwnershipService } from './interfaces/validate-products-ownership-service.interface';
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
    ProductCategoriesModule,
    IngredientsModule,
  ],
  controllers: [ProductsController],
  providers: [
    {
      provide: IProducImagesService,
      useClass: ProducImagesService,
    },
    {
      provide: IProductsService,
      useClass: ProductsService,
    },
    {
      provide: IValidateProductOwnershipService,
      useClass: ValidateProductOwnershipService,
    },
  ],
})
export class ProductsModule {}
