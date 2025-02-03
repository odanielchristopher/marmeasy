import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IClientsRepository } from 'src/shared/database/interfaces/clients-repository.interface';
import { IValidateClientOwnershipService } from '../interfaces/validate-client-ownership-service.interface';

@Injectable()
export class ValidateClientOwnershipService
  implements IValidateClientOwnershipService
{
  constructor(
    @Inject(IClientsRepository)
    private readonly clientsRepository: IClientsRepository,
  ) {}

  async validate(userId: string, clientId: string) {
    const isOwner = await this.clientsRepository.findFirstById({
      userId,
      id: clientId,
    });

    if (!isOwner) {
      throw new NotFoundException('Cliente não encontrado.');
    }

    return isOwner;
  }
}
