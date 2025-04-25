import { CreateProductDto } from 'src/modules/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/modules/products/dto/update-product.dto';
import { Product } from 'src/modules/products/entities/product.entity';

export const IProductsRepository = Symbol('IProductsRepository');

export interface IProductsRepository {
  findManyByFilters(
    findManyByUserIdDto: FindManyProductsByFiltersDto,
  ): Promise<Product[]>;

  findFirstByUserId(
    findFirstDto: FindFirstProductByUserIdDto,
  ): Promise<Product>;

  create(createDto: CreateProductOnDBDto): Promise<Product>;

  update(updateDto: UpdateProductOnDBDto): Promise<Product>;
  delete(deleteDto: DeleteProductDto): Promise<void>;
}

export type FindFirstProductByUserIdDto = {
  userId: string;
  id: string;
};

export type CreateProductOnDBDto = {
  data: CreateProductDto;
  userId: string;
};

export type FindManyProductsByFiltersDto = {
  filters: { userId: string; categoryName?: string };
  order: 'asc' | 'desc';
};

export type UpdateProductOnDBDto = {
  userId: string;
  data: UpdateProductDto;
};

export type DeleteProductDto = {
  userId: string;
  id: string;
};
