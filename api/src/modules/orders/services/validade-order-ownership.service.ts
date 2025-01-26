import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IOrdersRepository } from 'src/shared/database/interfaces/orders-repository.interface';
import { IValidateOrderOwnershipService } from '../interfaces/validate-order-ownership-service.interface';

@Injectable()
export class ValidateOrderOwnershipService
  implements IValidateOrderOwnershipService
{
  constructor(
    @Inject(IOrdersRepository)
    private readonly ordersRepository: IOrdersRepository,
  ) {}

  async validate(userId: string, orderId: string) {
    const isOwner = await this.ordersRepository.findUniqueByUserId({
      id: orderId,
      userId,
    });

    if (!isOwner) {
      throw new NotFoundException('Pedido não encontrado.');
    }

    return isOwner;
  }
}
