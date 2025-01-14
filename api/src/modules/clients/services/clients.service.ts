import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ValidateUserOwnershipService } from 'src/modules/users/services/validate-user-ownership.service';
import { IClientsRepository } from 'src/shared/database/interfaces/clients.repository.interface';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { ClientType } from '../entities/client.entity';
import { ValidateClientOwnershipService } from './validate-client-ownership.service';

@Injectable()
export class ClientsService {
  constructor(
    @Inject('IClientsRepository')
    private readonly clientsRepository: IClientsRepository,
    private readonly validateUserOwnershipService: ValidateUserOwnershipService,
    private readonly validateClientOwnershipService: ValidateClientOwnershipService,
  ) {}

  async findAllByUserId(userId: string) {
    const clients = await this.clientsRepository.findMany({
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

    const sortedClients = clients.sort((a, b) =>
      a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1,
    );

    return sortedClients;
  }

  async findOneByUserId(userId: string, clientId: string) {
    return this.clientsRepository.findFirst({
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
  }

  async create(userId: string, createClientDto: CreateClientDto) {
    await this.validateUserOwnershipService.validate(userId);

    const { name, phone, address, document, type, initialBalance } =
      createClientDto;

    if (document) {
      const documentAlreadyExists = await this.clientsRepository.findFirst({
        where: { userId, document },
        select: {
          document: true,
        },
      });

      const errorMessage =
        type === 'FISICO' ? 'CPF já cadastrado.' : 'CNPJ já cadastrado.';

      if (documentAlreadyExists) {
        throw new BadRequestException(errorMessage);
      }
    }

    return this.clientsRepository.create({
      data: {
        userId,
        name,
        phone: phone || null,
        address: address || null,
        document: document || null,
        type,
        balance: initialBalance,
      },
    });
  }

  async update(
    userId: string,
    clientId: string,
    updateClientDto: UpdateClientDto,
  ) {
    await this.validateClientOwnershipService.validate(userId, clientId);

    const { name, phone, address, document, type, balance } = updateClientDto;

    if (document) {
      const client = await this.clientsRepository.findFirst({
        where: { userId, document },
        select: {
          document: true,
          id: true,
        },
      });

      const errorMessage =
        type === 'FISICO' ? 'CPF já cadastrado.' : 'CNPJ já cadastrado.';

      if (client && client.id !== clientId) {
        throw new BadRequestException(errorMessage);
      }
    }

    return this.clientsRepository.update({
      where: { userId, id: clientId },
      data: {
        name,
        phone: phone || null,
        address: address || null,
        document: document || null,
        type: type as ClientType,
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
