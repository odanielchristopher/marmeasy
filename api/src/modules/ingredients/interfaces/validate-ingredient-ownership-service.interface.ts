import { Ingredient } from '../entities/ingredient.entity';

export const IValidateIngredientOwnershipService = Symbol(
  'IValidateIngredientOwnershipService',
);

export interface IValidateIngredientOwnershipService {
  validate(userId: string, ingredientId: string): Promise<Ingredient | void>;
}
