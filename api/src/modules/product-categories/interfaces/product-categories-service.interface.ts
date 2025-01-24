import { CreateProductCategoryDto } from '../dto/create-product-category.dto';
import { UpdateProductCategoryDto } from '../dto/update-product-category.dto';
import { ProductCategory } from '../entities/product-category.entity';

export interface IProductCategoriesService {
  findAllByUserId(userId: string): Promise<ProductCategory[]>;

  findOneByUserId(
    userId: string,
    productCategoryId: string,
  ): Promise<ProductCategory>;

  create(
    userId: string,
    createProductCategoryDto: CreateProductCategoryDto,
  ): Promise<ProductCategory>;

  update(
    userId: string,
    productCategoryId: string,
    updateProductCategoryDto: UpdateProductCategoryDto,
  ): Promise<ProductCategory>;

  remove(userId: string, productCategoryId: string): Promise<void>;
}
