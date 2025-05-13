import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
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

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
