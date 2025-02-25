import { Inject, Injectable } from '@nestjs/common';
import { IValidateClientOwnershipService } from 'src/modules/clients/interfaces/validate-client-ownership-service.interface';
import { IValidateUserOwnershipService } from 'src/modules/users/interfaces/validate-user-ownership-service.interface';
import { IOrdersRepository } from 'src/shared/database/interfaces/orders-repository.interface';
import { IPaginatedResponse } from 'src/shared/types';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { Order } from '../entities/order.entity';
import {
  FindAllBySearchTermDto,
  FindAllByUserIdDto,
  IOrdersService,
} from '../interfaces/orders-service.interface';
import { IValidateOrderOwnershipService } from '../interfaces/validate-order-ownership-service.interface';
import { Client } from 'src/modules/clients/entities/client.entity';
import { IUpdateClientBalanceService } from 'src/modules/clients/interfaces/update-client-balance-service.interface';

@Injectable()
export class OrdersService implements IOrdersService {
  constructor(
    @Inject(IOrdersRepository)
    private readonly ordersRepository: IOrdersRepository,
    @Inject(IUpdateClientBalanceService)
    private readonly updateClientBalanceService: IUpdateClientBalanceService,
    @Inject(IValidateUserOwnershipService)
    private readonly validateUserOwnershipService: IValidateUserOwnershipService,
    @Inject(IValidateOrderOwnershipService)
    private readonly validateOrderOwnershipService: IValidateOrderOwnershipService,
    @Inject(IValidateClientOwnershipService)
    private readonly validateClientOwnershipService: IValidateClientOwnershipService,
  ) {}

  async findAllBySearchTerm({
    userId,
    page,
    perPage,
    dateRange,
    searchTerm,
  }: FindAllBySearchTermDto): Promise<IPaginatedResponse<Order[]>> {
    await this.validateUserOwnershipService.validate(userId);

    return this.ordersRepository.findManyBySearchTerm({
      userId,
      dateRange,
      page: page || 1,
      perPage: perPage || 20,
      query: searchTerm.query,
    });
  }

  async findAllUserId({
    userId,
    page,
    perPage,
    dateRange,
  }: FindAllByUserIdDto) {
    await this.validateUserOwnershipService.validate(userId);

    return this.ordersRepository.findManyByUserId({
      userId,
      dateRange,
      page: page || 1,
      perPage: perPage || 20,
    });
  }

  async findAllByClientId(userId: string, clientId: string) {
    return this.ordersRepository.findManyByClientId({
      clientId,
      userId,
      order: 'desc',
    });
  }

  async create(userId: string, createOrderDto: CreateOrderDto) {
    const { clientId, items, discount, date } = createOrderDto;

    await this.validateUserOwnershipService.validate(userId);
    await this.validateClientOwnershipService.validate(userId, clientId);

    const totalValue =
      items.reduce((acc, item) => acc + item.total, 0) - (discount ?? 0);

    await this.updateClientBalance({
      userId,
      clientId,
      newValue: totalValue * -1,
    });

    const createdOrder = await this.ordersRepository.create({
      userId,
      data: {
        clientId,
        discount: discount ?? 0,
        date,
        total: totalValue,
        items,
      },
    });

    return createdOrder;
  }

  async update(
    userId: string,
    orderId: string,
    updateOrderDto: UpdateOrderDto,
  ) {
    const { discount, items, date, clientId } = updateOrderDto;

    const existingOrder = await this.validateOrderOwnershipService.validate(
      userId,
      orderId,
    );
    await this.validateClientOwnershipService.validate(userId, clientId);

    const currentItemsTotal = existingOrder.items.reduce(
      (acc, item) => acc + item.total,
      0,
    );
    const newItemsTotal = items.reduce((acc, item) => acc + item.total, 0);
    const newTotalValue =
      currentItemsTotal -
      (existingOrder.discount ?? 0) +
      newItemsTotal -
      (discount ?? 0);

    const updatedOrder = await this.ordersRepository.update({
      userId,
      id: orderId,
      data: {
        clientId,
        date: date,
        discount,
        total: newTotalValue,
        items,
      },
    });

    return updatedOrder;
  }

  async delete(userId: string, orderId: string) {
    await this.validateOrderOwnershipService.validate(userId, orderId);

    await this.ordersRepository.delete({ id: orderId, userId });

    return { message: 'Pedido excluído com sucesso.' };
  }

  private async updateClientBalance({
    userId,
    clientId,
    previousValue,
    newValue,
  }: {
    userId: string;
    clientId: string;
    previousValue?: number;
    newValue: number;
  }): Promise<Client> {
    return this.updateClientBalanceService.update({
      userId,
      clientId,
      previousValue,
      newValue,
    });
  }
}
