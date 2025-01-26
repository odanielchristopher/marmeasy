import { Injectable, NotFoundException } from '@nestjs/common';
import { OrdersRepository } from 'src/shared/database/repositories/orders.repository';

@Injectable()
export class ValidateOrderOwnershipService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async validate(userId: string, orderId: string) {
    const isOwner = await this.ordersRepository.findFirst({
      where: { id: orderId, userId },
    });

    if (!isOwner) {
      throw new NotFoundException('Pedido não encontrado.');
    }
  }
}
