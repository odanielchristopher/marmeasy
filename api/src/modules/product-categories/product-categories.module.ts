import { Module } from '@nestjs/common';
import { ValidateUserOwnershipService } from '../users/services/validate-user-ownership.service';

import { ProductCategoriesController } from './product-categories.controller';
import { ProductCategoriesService } from './services/product-categories.service';
import { ValidateProductCategoryOwnershipService } from './services/validate-product-category-ownership.service';

@Module({
  controllers: [ProductCategoriesController],
  providers: [
    ProductCategoriesService,
    ValidateUserOwnershipService,
    ValidateProductCategoryOwnershipService,
  ],
  exports: [ValidateProductCategoryOwnershipService],
})
export class ProductCategoriesModule {}
