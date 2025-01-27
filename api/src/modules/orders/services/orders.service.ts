import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IOrderItemsService } from 'src/modules/order-items/interfaces/order-items-service.interface';
import { IValidateUserOwnershipService } from 'src/modules/users/interfaces/validate-user-ownership-service.interface';
import { IOrdersRepository } from 'src/shared/database/interfaces/orders-repository.interface';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { UpdateStatusOrderDto } from '../dto/update-status-order.dto';
import { OrderStatus } from '../entities/status.entity';
import { IOrdersService } from '../interfaces/orders-service.interface';
import { IValidateOrderOwnershipService } from '../interfaces/validate-order-ownership-service.interface';

@Injectable()
export class OrdersService implements IOrdersService {
  constructor(
    @Inject(IOrdersRepository)
    private readonly ordersRepository: IOrdersRepository,
    @Inject(IOrderItemsService)
    private readonly orderItemsService: IOrderItemsService,
    @Inject(IValidateUserOwnershipService)
    private readonly validateUserOwnershipService: IValidateUserOwnershipService,
    @Inject(IValidateOrderOwnershipService)
    private readonly validateOrderOwnershipService: IValidateOrderOwnershipService,
  ) {}

  async findAllByClientId(userId: string, clientId: string) {
    return this.ordersRepository.findManyByClientId({
      clientId,
      userId,
      order: 'desc',
    });
  }

  async findOneById(userId: string, orderId: string) {
    const order = await this.ordersRepository.findUniqueByUserId({
      userId,
      id: orderId,
    });

    if (!order) {
      throw new NotFoundException('Pedido não encontrado.');
    }

    return order;
  }

  async create(userId: string, createOrderDto: CreateOrderDto) {
    await this.validateUserOwnershipService.validate(userId);

    const { clientId, items, discount, date } = createOrderDto;

    const totalValue =
      items.reduce((acc, item) => acc + item.total, 0) - (discount ?? 0);

    const createdOrder = await this.ordersRepository.create({
      userId,
      data: {
        clientId,
        discount: discount ?? 0,
        date: date ?? new Date(),
        status: OrderStatus['PENDING'],
        totalValue,
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
    const existingOrder = await this.validateOrderOwnershipService.validate(
      userId,
      orderId,
    );

    const { discount, items, date, clientId } = updateOrderDto;

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
      data: {
        id: orderId,
        clientId,
        date: date,
        discount,
        totalValue: newTotalValue,
        items,
        status: OrderStatus['PENDING'],
      },
    });

    return updatedOrder;
  }

  async updateStatus(
    userId: string,
    orderId: string,
    updateOrderStatusDto: UpdateStatusOrderDto,
  ) {
    await this.validateOrderOwnershipService.validate(userId, orderId);

    const order = await this.ordersRepository.findUniqueByUserId({
      userId,
      id: orderId,
    });

    if (!order) {
      throw new NotFoundException('Pedido não encontrado.');
    }

    return this.ordersRepository.update({
      userId,
      data: {
        ...order,
        status: OrderStatus[updateOrderStatusDto.status],
      },
    });
  }

  async delete(userId: string, orderId: string) {
    await this.validateOrderOwnershipService.validate(userId, orderId);

    await this.ordersRepository.delete({ id: orderId, userId });

    return { message: 'Pedido excluído com sucesso.' };
  }

  async deleteItem(userId: string, orderId: string, orderItemId: string) {
    const findedOrder = await this.validateOrderOwnershipService.validate(
      userId,
      orderId,
    );

    await this.orderItemsService.delete(userId, orderItemId);

    const totalItems = findedOrder.items.reduce(
      (sum, item) => sum + item.total,
      0,
    );

    const newTotalValue = totalItems - findedOrder.discount;

    await this.ordersRepository.update({
      userId,
      data: {
        ...findedOrder,
        totalValue: newTotalValue,
      },
    });

    return { message: 'Item excluído e pedido atualizado com sucesso.' };
  }
}
