import { FavoriteIngredient } from 'src/modules/dashboard/entities/favorite.entity';
import { Sale } from 'src/modules/dashboard/entities/sale.entity';
import { CreateOrderDto } from 'src/modules/orders/dto/create-order.dto';
import { UpdateOrderDto } from 'src/modules/orders/dto/update-order.dto';
import { Order } from 'src/modules/orders/entities/order.entity';
import { DateRangeDto } from 'src/shared/dto/date-range.dto';

export const IOrdersRepository = Symbol('IOrdersRepository');

export interface IOrdersRepository {
  findManyByClientId(
    findManyByClientIdDto: FindManyByClientIdDto,
  ): Promise<Order[]>;

  findAllByDateRange(
    userId: string,
    startDate: string,
    endDate: string,
    limit?: number,
    offset?: number,
  ): Promise<Order[]>;

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

export type FindAllByDateRangeDto = {
  userId: string;
  startDate: Date;
  endDate: Date;
  limit?: number;
  offset?: number;
};

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
