import { FavoriteIngredient } from 'src/modules/dashboard/entities/favorite.entity';
import { Sale } from 'src/modules/dashboard/entities/sale.entity';
import { CreateOrderDto } from 'src/modules/orders/dto/create-order.dto';
import { UpdateOrderDto } from 'src/modules/orders/dto/update-order.dto';
import { Order } from 'src/modules/orders/entities/order.entity';
import { DateRangeDto } from 'src/shared/dto/date-range.dto';
import { IPaginatedResponse } from 'src/shared/types';

export const IOrdersRepository = Symbol('IOrdersRepository');

export interface IOrdersRepository {
  findManyByClientId(
    findManyByClientIdDto: FindManyByClientIdDto,
  ): Promise<Order[]>;

  findManyBySearchTerm(
    findManyBySearchDto: FindManyBySeachTermDto,
  ): Promise<IPaginatedResponse<Order[]>>;

  findManyByUserId(
    findAllByUserIdDto: FindManyByUserIdDto,
  ): Promise<IPaginatedResponse<Order[]>>;

  findManyOnSaleFormat(findManySaleDto: FindManySaleDto): Promise<Sale[]>;

  findFavoriteIngredients(
    findFavoritesDto: FindFavoriteIngredientsDto,
  ): Promise<FavoriteIngredient[]>;

  findFirstByClientId(
    findFirstByClientIdDto: FindFirstOrderByClientIdDto,
  ): Promise<Order>;

  findUniqueByUserId(findUniqueDto: FindUniqueOrderByIdDto): Promise<Order>;

  create(createDto: CreateOrderParams): Promise<Order>;

  update(updateDto: UpdateOrderParams): Promise<Order>;

  delete(deleteDto: DeleteOrderItemDto): Promise<Order | void>;
}

export type FindFavoriteIngredientsDto = {
  userId: string;
  podiumPositions?: number;
  dateRange: DateRangeDto;
};

export type FindManyByClientIdDto = {
  userId: string;
  clientId: string;
  order: 'asc' | 'desc';
};

export type FindManySaleDto = {
  userId: string;
  dateRange: DateRangeDto;
};

export type FindUniqueOrderByIdDto = {
  userId: string;
  id: string;
};

export type FindManyByUserIdDto = {
  userId: string;
  dateRange?: DateRangeDto;
  perPage?: number;
  page?: number;
};

export type FindManyBySeachTermDto = FindManyByUserIdDto & { query: string };

export type FindFirstOrderByClientIdDto = {
  userId: string;
  clientId: string;
  id: string;
};

export type CreateOrderParams = {
  data: CreateOrderDto;
  userId: string;
};

export type UpdateOrderParams = {
  userId: string;
  id: string;
  data: UpdateOrderDto;
};

export type DeleteOrderItemDto = {
  userId: string;
  id: string;
};
