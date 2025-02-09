import { FavoriteIngredient } from 'src/modules/dashboard/entities/favorite.entity';

export type PrismaFavoriteResponse = {
  ingredientName: string;
  totalUses: number;
};

export class FavoriteIngredientMapper {
  private static instance: FavoriteIngredientMapper;

  static getInstance() {
    if (!this.instance) {
      return new FavoriteIngredientMapper();
    }

    return this.instance;
  }

  private constructor() {}

  toDomain(persistenceObject: PrismaFavoriteResponse): FavoriteIngredient {
    if (!persistenceObject) {
      return null;
    }

    const { ingredientName, totalUses } = persistenceObject;

    return {
      id: ingredientName,
      title: ingredientName,
      quantitity: Number(totalUses),
    };
  }
}
