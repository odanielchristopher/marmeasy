import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IOrdersRepository } from 'src/shared/database/interfaces/orders-repository.interface';

@Injectable()
export class ValidateOrderCustomerOwnershipService {
  constructor(
    @Inject(IOrdersRepository)
    private readonly ordersRepository: IOrdersRepository,
  ) {}

  async validate(customerId: string, orderId: string) {
    const isOwner = await this.ordersRepository.findFirstById({
      customerId,
      orderId,
    });

    if (!isOwner || isOwner.customerId !== customerId) {
      throw new NotFoundException(
        'Pedido não encontrado ou o cliente não é o proprietário.',
      );
    }

    return isOwner;
  }
}
