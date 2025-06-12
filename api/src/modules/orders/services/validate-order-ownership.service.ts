import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IOrdersRepository } from 'src/shared/database/interfaces/orders-repository.interface';

@Injectable()
export class ValidateOrderOwnershipService {
  constructor(
    @Inject(IOrdersRepository)
    private readonly ordersRepository: IOrdersRepository,
  ) {}

  async validate({ orderId, userId }: { orderId: string; userId: string }) {
    const isOwner = await this.ordersRepository.findFirstById({
      orderId,
      userId,
    });

    if (!isOwner) {
      throw new NotFoundException(
        'Pedido não encontrado ou o cliente não é o proprietário.',
      );
    }

    return isOwner;
  }
}
