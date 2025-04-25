import { Ingredient } from 'src/modules/ingredients/entities/ingredient.entity';

export const IIngredientsRepository = Symbol('IIngredientsRepository');

export interface IIngredientsRepository {
  findManyByUserId(
    findManyDto: FindManyIngredientsByIdDto,
  ): Promise<Ingredient[]>;
  findFirstByUserId(
    findFirstByIdDto: FindFirstIngredientDto,
  ): Promise<Ingredient>;
  create(createIngredientDto: CreateIngredientDto): Promise<Ingredient>;
  update(updateIngredientDto: UpdateIngredientDto): Promise<Ingredient>;
  delete(deleteIngredientDto: DeleteIngredientDto): Promise<void>;
}

export type FindFirstIngredientDto = {
  userId: string;
  id?: string;
};

export type FindFirstIngredientByNameDto = {
  userId: string;
  name: string;
};

export type FindManyIngredientsByIdDto = {
  userId: string;
  order: 'asc' | 'desc';
};

export type CreateIngredientDto = {
  data: Ingredient | Omit<Ingredient, 'id'>;
  userId: string;
};

export type UpdateIngredientDto = {
  userId: string;
  data: Ingredient;
};

export type DeleteIngredientDto = {
  userId: string;
  id: string;
};
