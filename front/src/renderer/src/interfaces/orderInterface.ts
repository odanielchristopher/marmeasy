import { ICategory } from './categoryInterface';
import { IIngredient } from './ingredientInterface';

export interface IOrder {
  id: number
  image: string
  name: string
  category: ICategory
  ingredients: Array<IIngredient>
  value: number
};
