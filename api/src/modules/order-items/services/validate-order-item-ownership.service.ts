import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IOrderItemsRepository } from 'src/shared/database/interfaces/orders-item-repository.interface';
import { IValidateOrderItemsOwnershipService } from '../interfaces/validate-order-item-ownership-service.interface';

@Injectable()
export class ValidateOrderItemsOwnershipService
  implements IValidateOrderItemsOwnershipService
{
  constructor(
    @Inject(IOrderItemsRepository)
    private readonly orderItemsRepository: IOrderItemsRepository,
  ) {}

  async validate(userId: string, orderItemId: string) {
    const isOwner = await this.orderItemsRepository.findUniqueByUserId({
      id: orderItemId,
      userId,
    });

    if (!isOwner) {
      throw new NotFoundException('Item do pedido não encontrado.');
    }
  }
}
