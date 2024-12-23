import { Injectable, NotFoundException } from '@nestjs/common';
import { ValidateUserOwnershipService } from 'src/modules/users/services/validate-user-ownership.service';
import { ClientsRespository } from 'src/shared/database/repositories/clients.repository';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { ValidateClientOwnershipService } from './validate-client-ownership.service';

@Injectable()
export class ClientsService {
  constructor(
    private readonly clientsRepository: ClientsRespository,
    private readonly validateUserOwnershipService: ValidateUserOwnershipService,
    private readonly validateClientOwnershipService: ValidateClientOwnershipService,
  ) {}

  async create(userId: string, createClientDto: CreateClientDto) {
    await this.validateUserOwnershipService.validate(userId);

    const { name, phone, address, document, type, initialBalance } =
      createClientDto;

    return this.clientsRepository.create({
      data: {
        userId,
        name,
        phone,
        address,
        document,
        type,
        balance: initialBalance,
      },
    });
  }

  async findAllByUserId(userId: string) {
    return this.clientsRepository.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        name: true,
        phone: true,
        type: true,
        address: true,
        document: true,
        balance: true,
      },
    });
  }

  async findOneByUserId(userId: string, clientId: string) {
    const client = await this.clientsRepository.findFirst({
      where: {
        userId,
        id: clientId,
      },
      select: {
        id: true,
        name: true,
        phone: true,
        type: true,
        address: true,
        document: true,
        balance: true,
      },
    });

    if (!client) {
      throw new NotFoundException('Cliente não encontrado.');
    }

    return client;
  }

  async update(
    userId: string,
    clientId: string,
    updateClientDto: UpdateClientDto,
  ) {
    await this.validateClientOwnershipService.validate(userId, clientId);

    const { name, phone, address, document, type, balance } = updateClientDto;

    return this.clientsRepository.update({
      where: { id: clientId },
      data: {
        name,
        phone,
        address,
        document,
        type,
        balance,
      },
      select: {
        id: true,
        name: true,
        phone: true,
        address: true,
        document: true,
        type: true,
        balance: true,
      },
    });
  }

  async remove(userId: string, clientId: string) {
    await this.validateClientOwnershipService.validate(userId, clientId);

    await this.clientsRepository.delete({
      where: { id: clientId },
    });

    return null;
  }
}
