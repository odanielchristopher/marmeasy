import { FavoriteIngredient } from 'src/modules/dashboard/entities/favorite.entity';
import { IDataMapper } from '../interfaces/data-mapper.interface';

export type PrismaFavoriteResponse = {
  ingredientName: string;
  totalUses: number;
};

export class FavoriteIngredientMapper
  implements IDataMapper<PrismaFavoriteResponse, FavoriteIngredient>
{
  toDomain(persistenceObject: PrismaFavoriteResponse): FavoriteIngredient {
    if (!persistenceObject) {
      return null;
    }

    const { ingredientName, totalUses } = persistenceObject;

    return {
      id: ingredientName,
      title: ingredientName,
      quantity: Number(totalUses),
    };
  }
}
