import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IClientsRepository } from 'src/shared/database/interfaces/clients.repository.interface';

@Injectable()
export class ValidateClientOwnershipService {
  constructor(
    @Inject('IClientsRepository')
    private readonly clientsRepository: IClientsRepository,
  ) {}

  async validate(userId: string, clientId: string) {
    const isOwner = await this.clientsRepository.findFirst({
      where: { id: clientId, userId },
    });

    if (!isOwner) {
      throw new NotFoundException('Cliente não encontrado.');
    }
  }
}
