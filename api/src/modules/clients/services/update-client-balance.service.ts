import { Inject, Injectable } from '@nestjs/common';
import { IClientsRepository } from 'src/shared/database/interfaces/clients-repository.interface';
import { Client } from '../entities/client.entity';
import {
  IUpdateClientBalanceService,
  UpdateBalanceParams,
} from '../interfaces/update-client-balance-service.interface';
import { IValidateClientOwnershipService } from '../interfaces/validate-client-ownership-service.interface';

@Injectable()
export class UpdateClientBalance implements IUpdateClientBalanceService {
  constructor(
    @Inject(IClientsRepository)
    private readonly clientsRepository: IClientsRepository,
    @Inject(IValidateClientOwnershipService)
    private readonly validateClientOwnershipService: IValidateClientOwnershipService,
  ) {}
  async update({
    userId,
    clientId,
    previousValue,
    newValue,
  }: UpdateBalanceParams): Promise<Client> {
    const findedClient = await this.validateClientOwnershipService.validate(
      userId,
      clientId,
    );

    const newBalance = findedClient.balance - (previousValue || 0) + newValue;

    const { id, name, type, address, document, phone } = findedClient;

    return this.clientsRepository.update({
      userId,
      data: {
        id,
        name,
        type,
        address,
        document,
        phone,
        balance: newBalance,
      },
    });
  }
}
