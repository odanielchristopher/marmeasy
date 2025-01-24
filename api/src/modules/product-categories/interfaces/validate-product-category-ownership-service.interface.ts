import { ProductCategory } from '../entities/product-category.entity';

export interface IValidateProductCategoryOwnershipService {
  validate(
    userId: string,
    productCategoryId: string,
  ): Promise<ProductCategory | void>;
}
