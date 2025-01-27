import { Inject, Injectable } from '@nestjs/common';
import { IOrderItemsService } from 'src/modules/order-items/interfaces/order-items-service.interface';
import { IValidateUserOwnershipService } from 'src/modules/users/interfaces/validate-user-ownership-service.interface';
import { IOrdersRepository } from 'src/shared/database/interfaces/orders-repository.interface';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
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
}
