import { ProductCategory } from 'src/modules/product-categories/entities/product-category.entity';

export const IProductCategoriesRepository = Symbol(
  'IProductCategoriesRepository',
);

export interface IProductCategoriesRepository {
  findManyByUserId(
    findManyDto: FindManyProductCategoriesDto,
  ): Promise<ProductCategory[] | null>;
  findFirstByUserId(
    findFirstByIdDto: FindFirstProductCategoryDto,
  ): Promise<ProductCategory | null>;
  findFirstByName(
    findFirstByNameDto: FindFirstProductCategoryByNameDto,
  ): Promise<ProductCategory | null>;
  create(
    createProductCategoryDto: CreateProductCategoryDto,
  ): Promise<ProductCategory | null>;
  update(
    updateProductCategoryDto: UpdateProductCategoryDto,
  ): Promise<ProductCategory | null>;
  delete(deleteProductCategoryDto: DeleteProductCategoryDto): Promise<void>;
}

export type FindFirstProductCategoryDto = {
  userId: string;
  id?: string;
};

export type FindFirstProductCategoryByNameDto = {
  userId: string;
  name: string;
};

export type FindManyProductCategoriesDto = {
  userId: string;
  order: 'asc' | 'desc';
};

export type CreateProductCategoryDto = {
  data: ProductCategory;
  userId: string;
};

export type UpdateProductCategoryDto = {
  userId: string;
  data: ProductCategory;
};

export type DeleteProductCategoryDto = {
  userId: string;
  id: string;
};
