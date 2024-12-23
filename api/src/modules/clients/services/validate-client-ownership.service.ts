import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientsRespository } from 'src/shared/database/repositories/clients.repository';

@Injectable()
export class ValidateClientOwnershipService {
  constructor(private readonly clientsRepository: ClientsRespository) {}

  async validate(userId: string, clientId: string) {
    const isOwner = await this.clientsRepository.findFirst({
      where: { id: clientId, userId },
    });

    if (!isOwner) {
      throw new NotFoundException('Cliente não encontrado.');
    }
  }
}
