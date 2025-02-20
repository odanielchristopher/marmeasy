import { ProductCategory } from '../entities/product-category.entity';

export const IValidateProductCategoryOwnershipService = Symbol(
  'IValidateProductCategoryOwnershipService',
);

export interface IValidateProductCategoryOwnershipService {
  validate(
    userId: string,
    productCategoryId: string,
  ): Promise<ProductCategory | void>;
}
