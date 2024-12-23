import { Module } from '@nestjs/common';
import { ValidateUserOwnershipService } from '../users/services/validate-user-ownership.service';
import { ProductCategoryController } from './product-category.controller';
import { ProductCategoryService } from './services/product-category.service';
import { ValidateProductCategoryOwnershipService } from './services/validate-product-category-ownership.service';

@Module({
  controllers: [ProductCategoryController],
  providers: [
    ProductCategoryService,
    ValidateUserOwnershipService,
    ValidateProductCategoryOwnershipService,
  ],
  exports: [ValidateProductCategoryOwnershipService],
})
export class ProductCategoryModule {}
