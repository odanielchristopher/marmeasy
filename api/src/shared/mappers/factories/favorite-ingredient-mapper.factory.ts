import { FavoriteIngredient } from 'src/modules/dashboard/entities/favorite.entity';
import {
  FavoriteIngredientMapper,
  PrismaFavoriteResponse,
} from '../classes/favorite-ingredient.mapper';
import { IDataMapperFactory } from '../interfaces/data-mapper-factory.interface';
import { IDataMapper } from '../interfaces/data-mapper.interface';

export const IFavoriteIngredientMapperFactory = Symbol(
  'IFavoriteIngredientMapperFactory',
);

export class FavoriteIngredientMapperFactory
  implements IDataMapperFactory<PrismaFavoriteResponse, FavoriteIngredient>
{
  getInstance(): IDataMapper<PrismaFavoriteResponse, FavoriteIngredient> {
    return FavoriteIngredientMapper.getInstance();
  }
}
