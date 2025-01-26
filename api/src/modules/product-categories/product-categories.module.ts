import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { IProductCategoriesService } from './interfaces/product-categories-service.interface';
import { IValidateProductCategoryOwnershipService } from './interfaces/validate-product-category-ownership-service.interface';
import { ProductCategoriesController } from './product-categories.controller';
import { ProductCategoriesService } from './services/product-categories.service';
import { ValidateProductCategoryOwnershipService } from './services/validate-product-category-ownership.service';

@Module({
  imports: [UsersModule],
  controllers: [ProductCategoriesController],
  providers: [
    {
      provide: IProductCategoriesService,
      useClass: ProductCategoriesService,
    },
    {
      provide: IValidateProductCategoryOwnershipService,
      useClass: ValidateProductCategoryOwnershipService,
    },
  ],
  exports: [
    {
      provide: IValidateProductCategoryOwnershipService,
      useClass: ValidateProductCategoryOwnershipService,
    },
  ],
})
export class ProductCategoriesModule {}
