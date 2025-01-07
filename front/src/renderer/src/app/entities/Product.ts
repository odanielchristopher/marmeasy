import { Ingredient } from './Ingredient';
import { ProductCategory } from './ProductCategory';

export interface Product {
  id: string;
  name: string;
  imagePath: string;
  description: string;
  price: number;
  category: ProductCategory;
  ingredients: Ingredient[];
}
