import { Inject, Injectable } from '@nestjs/common';
import { IValidateUserOwnershipService } from 'src/modules/users/interfaces/validate-user-ownership-service.interface';
import { IOrderItemsRepository } from 'src/shared/database/interfaces/orders-item-repository.interface';
import { CreateOrderItemDto } from '../dto/create-order-items.dto';
import { UpdateOrderItemDto } from '../dto/update-ordem-item.dto';
import { IOrderItemsService } from '../interfaces/order-items-service.interface';
import { IValidateOrderItemsOwnershipService } from '../interfaces/validate-order-item-ownership-service.interface';

@Injectable()
export class OrderItemsService implements IOrderItemsService {
  constructor(
    @Inject(IOrderItemsRepository)
    private readonly orderItemsRepository: IOrderItemsRepository,
    @Inject(IValidateUserOwnershipService)
    private readonly validateUserOwnershipService: IValidateUserOwnershipService,
    @Inject(IValidateOrderItemsOwnershipService)
    private readonly validateOrderItemsOwnershipService: IValidateOrderItemsOwnershipService,
  ) {}

  async findAllByOrder(userId: string, orderId: string) {
    await this.validateUserOwnershipService.validate(userId);

    return this.orderItemsRepository.findManyByOrderId({
      userId,
      orderId,
      order: 'asc',
    });
  }

  async findOneById(userId: string, orderItemId: string) {
    await this.validateOrderItemsOwnershipService.validate(userId, orderItemId);

    return this.orderItemsRepository.findUniqueByUserId({
      id: orderItemId,
      userId,
    });
  }

  async create(
    userId: string,
    orderId: string,
    createOrderItemDto: CreateOrderItemDto,
  ) {
    await this.validateUserOwnershipService.validate(userId);

    const { quantity, ingredients, name, total, unitPrice } =
      createOrderItemDto;

    return this.orderItemsRepository.create({
      userId,
      data: {
        name,
        ingredients,
        quantity,
        unitPrice,
        total,
        orderId,
      },
    });
  }

  async update(
    userId: string,
    orderItemId: string,
    updateOrderItemDto: UpdateOrderItemDto,
  ) {
    await this.validateOrderItemsOwnershipService.validate(userId, orderItemId);

    const { name, ingredients, quantity, unitPrice, total } =
      updateOrderItemDto;

    return this.orderItemsRepository.update({
      userId,
      data: {
        id: orderItemId,
        name,
        ingredients,
        quantity,
        unitPrice,
        total,
      },
    });
  }

  async delete(userId: string, orderItemId: string) {
    await this.validateOrderItemsOwnershipService.validate(userId, orderItemId);

    await this.orderItemsRepository.delete({ id: orderItemId, userId });

    return { message: 'Item do pedido excluído com sucesso.' };
  }
}
