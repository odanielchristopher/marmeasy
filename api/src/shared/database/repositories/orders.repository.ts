import { Inject, Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';

import { FavoriteIngredient } from 'src/modules/dashboard/entities/favorite.entity';
import { Sale } from 'src/modules/dashboard/entities/sale.entity';
import { Order } from 'src/modules/orders/entities/order.entity';

import {
  CreateOrderParams,
  DeleteOrderItemDto,
  FindFavoriteIngredientsDto,
  FindFirstOrderByClientIdDto,
  FindManyByClientIdDto,
  FindManySaleDto,
  FindUniqueOrderByIdDto,
  IOrdersRepository,
  UpdateOrderParams,
} from '../interfaces/orders-repository.interface';

import { PrismaFavoriteResponse } from 'src/shared/mappers/classes/favorite-ingredient.mapper';
import { PrismaOrderResponse } from 'src/shared/mappers/classes/order.mapper';
import { PrismaSaleResponse } from 'src/shared/mappers/classes/sale.mapper';
import { DataMapperType } from 'src/shared/mappers/factories/data-mappers.factory';
import { IDataMappersFactory } from 'src/shared/mappers/interfaces/data-mappers-factory.interface';

const prismaResponse = {
  id: true,
  userId: true,
  clientId: true,
  date: true,
  discount: true,
  status: true,
  totalValue: true,
  items: {
    select: {
      id: true,
      orderId: true,
      name: true,
      ingredients: true,
      unitPrice: true,
      quantity: true,
      total: true,
    },
  },
};

@Injectable()
export class OrdersRepository implements IOrdersRepository {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(IDataMappersFactory)
    private readonly dataMappersFactory: IDataMappersFactory,
  ) {}

  async findFavoriteIngredients(
    findFavoritesDto: FindFavoriteIngredientsDto,
  ): Promise<FavoriteIngredient[]> {
    const { userId, podiumPositions = 3, dateRange } = findFavoritesDto;
    const { fromDate, toDate } = dateRange;

    const topIngredients = await this.prismaService.$queryRaw<
      PrismaFavoriteResponse[]
    >`
      SELECT
          unnest(i."ingredients") AS "ingredientName",
          COUNT(*) AS "totalUses"
      FROM "order_items" i
      JOIN "orders" o ON i."order_id" = o."id"
      WHERE
        o."user_id" = ${userId}::uuid
        AND o."date" BETWEEN ${fromDate}::timestamp AND ${toDate}::timestamp
      GROUP BY "ingredientName"
      ORDER BY "totalUses" DESC
      LIMIT ${podiumPositions};
    `;

    return topIngredients.map((ingredient) =>
      this.favoriteIngredientParser(ingredient),
    );
  }

  async findManyOnSaleFormat(
    findManySaleDto: FindManySaleDto,
  ): Promise<Sale[]> {
    const { userId, dateRange } = findManySaleDto;
    const { fromDate, toDate } = dateRange;

    const sales = await this.prismaService.$queryRaw<PrismaSaleResponse[]>`
      SELECT
        o.client_id AS "clientId",
        c.name AS "clientName",
        DATE_TRUNC('day', o.date) AS date,
        COUNT(o.id) AS "quantity",
        SUM(o."totalValue") AS "totalAmount"
      FROM orders o
      JOIN clients c ON o.client_id = c.id
      WHERE
        o.user_id = ${userId}::uuid
        AND o.date BETWEEN ${fromDate}::timestamp AND ${toDate}::timestamp
      GROUP BY o.client_id, c.name, DATE_TRUNC('day', o.date)
      ORDER BY date DESC, quantity DESC;
    `;

    return sales.map((sale) => this.saleParser(sale));
  }

  async findManyByClientId(
    findManyByClientIdDto: FindManyByClientIdDto,
  ): Promise<Order[]> {
    const { order, userId, clientId } = findManyByClientIdDto;

    const findendOrders = await this.prismaService.order.findMany({
      where: { userId, clientId },
      orderBy: { date: order },
      select: prismaResponse,
    });

    return findendOrders.map((order) => this.parser(order));
  }

  async findAllByDateRange(
    userId: string,
    startDate: string,
    endDate: string,
    perPage?: number,
    page?: number,
  ): Promise<Order[]> {
    const findedOrders = await this.prismaService.order.findMany({
      skip: page || 0,
      take: perPage || 10,
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: prismaResponse,
    });

    return findedOrders.map((order) => this.parser(order));
  }

  async findFirstByClientId(
    findFirstByClientIdDto: FindFirstOrderByClientIdDto,
  ): Promise<Order> {
    const { id, userId, clientId } = findFirstByClientIdDto;

    const findedOrder = await this.prismaService.order.findFirst({
      where: { id, userId, clientId },
      select: prismaResponse,
    });

    return this.parser(findedOrder);
  }

  async findUniqueByUserId(
    findUniqueDto: FindUniqueOrderByIdDto,
  ): Promise<Order> {
    const { id, userId } = findUniqueDto;

    const findedOrder = await this.prismaService.order.findUnique({
      where: { id, userId },
      select: prismaResponse,
    });

    return this.parser(findedOrder);
  }

  async create(createDto: CreateOrderParams): Promise<Order> {
    const { data, userId } = createDto;

    const { items, date, discount, total, clientId } = data;

    const createdOrder = await this.prismaService.order.create({
      data: {
        date,
        discount,
        totalValue: total,
        clientId,
        userId,
        items: {
          createMany: {
            data: items.map((item) => ({ ...item, userId })),
          },
        },
      },
      select: prismaResponse,
    });

    return this.parser(createdOrder);
  }

  async update(updateDto: UpdateOrderParams): Promise<Order> {
    const { data, userId, id } = updateDto;

    const { items, date, discount, total, clientId } = data;

    const updatedOrder = await this.prismaService.order.update({
      where: { userId, id },
      data: {
        date,
        discount,
        totalValue: total,
        clientId,
        userId,
        items: {
          deleteMany: {},
          createMany: {
            data: items.map((item) => ({ ...item, userId })),
          },
        },
      },
      select: prismaResponse,
    });

    return this.parser(updatedOrder);
  }

  async delete(deleteDto: DeleteOrderItemDto): Promise<Order | void> {
    const { id, userId } = deleteDto;

    await this.prismaService.order.delete({
      where: { id, userId },
      include: { items: true },
    });
  }

  private parser(prismaOrder: PrismaOrderResponse) {
    return this.dataMappersFactory
      .getInstance<PrismaOrderResponse, Order>(DataMapperType.ORDER)
      .toDomain(prismaOrder);
  }

  private saleParser(prismaSale: PrismaSaleResponse) {
    return this.dataMappersFactory
      .getInstance<PrismaSaleResponse, Sale>(DataMapperType.SALE)
      .toDomain(prismaSale);
  }

  private favoriteIngredientParser(prismaFavorite: PrismaFavoriteResponse) {
    return this.dataMappersFactory
      .getInstance<
        PrismaFavoriteResponse,
        FavoriteIngredient
      >(DataMapperType.FAVORITE)
      .toDomain(prismaFavorite);
  }
}
