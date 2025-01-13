import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderItemsRepository } from 'src/shared/database/repositories/order-items.repository';

@Injectable()
export class ValidateOrderItemsOwnershipService {
  constructor(private readonly orderItemsRepository: OrderItemsRepository) {}

  async validate(userId: string, orderItemId: string) {
    const isOwner = await this.orderItemsRepository.findFirst({
      where: { id: orderItemId, userId },
    });

    if (!isOwner) {
      throw new NotFoundException('Item do pedido não encontrado.');
    }
  }
}
