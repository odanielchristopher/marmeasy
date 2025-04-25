import { CreateProductCategoryDto } from 'src/modules/product-categories/dto/create-product-category.dto';
import { UpdateProductCategoryDto } from 'src/modules/product-categories/dto/update-product-category.dto';
import { Ingredient } from '../entities/ingredient.entity';

export const IIngredientsService = Symbol('IIngredientsService');

export interface IIngredientsService {
  findAllByUserId(userId: string): Promise<Ingredient[]>;

  findOneByUserId(userId: string, ingredientId: string): Promise<Ingredient>;

  create(
    userId: string,
    createProductCategoryDto: CreateProductCategoryDto,
  ): Promise<Ingredient>;

  update(
    userId: string,
    productCategoryId: string,
    updateProductCategoryDto: UpdateProductCategoryDto,
  ): Promise<Ingredient>;

  remove(userId: string, ingredientId: string): Promise<void>;
}
