import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { IValidateUserOwnershipService } from 'src/modules/users/interfaces/validate-user-ownership-service.interface';
import { IClientsRepository } from 'src/shared/database/interfaces/clients-repository.interface';
import { SearchTermDto } from 'src/shared/dto/search-term.dto';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { IClientsService } from '../interfaces/clients-service.interface';
import { IValidateClientOwnershipService } from '../interfaces/validate-client-ownership-service.interface';

@Injectable()
export class ClientsService implements IClientsService {
  constructor(
    @Inject(IClientsRepository)
    private readonly clientsRepository: IClientsRepository,
    @Inject(IValidateUserOwnershipService)
    private readonly validateUserOwnershipService: IValidateUserOwnershipService,
    @Inject(IValidateClientOwnershipService)
    private readonly validateClientOwnershipService: IValidateClientOwnershipService,
  ) {}

  findAllBySearchTerm(
    userId: string,
    searchTerm: SearchTermDto,
    page: number,
    perPage: number,
  ) {
    return this.clientsRepository.findManyBySearchTerm({
      userId,
      searchTerm,
      page: page || 1,
      perPage: perPage || 20,
      order: 'asc',
    });
  }

  findAllByUserId(userId: string, page: number, perPage: number) {
    return this.clientsRepository.findManyByUserId({
      userId,
      order: 'asc',
      page: page || 1,
      perPage: perPage || 20,
    });
  }

  findOneByUserId(userId: string, clientId: string) {
    return this.clientsRepository.findFirstById({ userId, id: clientId });
  }

  async create(userId: string, createClientDto: CreateClientDto) {
    await this.validateUserOwnershipService.validate(userId);

    const { name, phone, address, document, type, initialBalance } =
      createClientDto;

    if (document) {
      const clientAlreadyExists =
        await this.clientsRepository.findFirstByDocument({ userId, document });

      const errorMessage =
        type === 'FISICO' ? 'CPF já cadastrado.' : 'CNPJ já cadastrado.';

      if (clientAlreadyExists && clientAlreadyExists.active) {
        throw new BadRequestException(errorMessage);
      }

      if (clientAlreadyExists && !clientAlreadyExists.active) {
        return this.clientsRepository.update({
          userId,
          data: {
            id: clientAlreadyExists.id,
            name,
            phone,
            address,
            document,
            type,
            balance: initialBalance,
          },
        });
      }
    }

    return this.clientsRepository.create({
      userId,
      data: {
        name,
        phone,
        address,
        document,
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
      const client = await this.clientsRepository.findFirstByDocument({
        userId,
        document,
      });

      const errorMessage =
        type === 'FISICO' ? 'CPF já cadastrado.' : 'CNPJ já cadastrado.';

      if (client && client.id !== clientId) {
        throw new ConflictException(errorMessage);
      }
    }

    return this.clientsRepository.update({
      userId,
      data: {
        id: clientId,
        name,
        phone,
        address,
        document,
        type,
        balance,
      },
    });
  }

  async remove(userId: string, clientId: string) {
    await this.validateClientOwnershipService.validate(userId, clientId);

    await this.clientsRepository.delete({ userId, id: clientId });

    return null;
  }
}
