import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Ingredient } from 'src/modules/ingredients/entities/ingredient.entity';
import { ProductCategory } from 'src/modules/product-categories/entities/product-category.entity';

export class Product {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  imagePath?: string;

  @IsNotEmpty()
  category?: ProductCategory;

  @IsArray()
  @IsNotEmpty()
  ingredients: Ingredient[];

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
