import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { IValidateUserOwnershipService } from 'src/modules/users/interfaces/validate-user-ownership-service.interface';
import { IClientsRepository } from 'src/shared/database/interfaces/clients-repository.interface';
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

  async findAllByUserId(userId: string, page = 1, perPage = 20) {
    const { data, items } = await this.clientsRepository.findManyByUserId({
      userId,
      order: 'asc',
      page,
      perPage,
    });

    const sortedData = data.sort((a, b) =>
      a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1,
    );

    return {
      data: sortedData,
      items,
    };
  }

  async findOneByUserId(userId: string, clientId: string) {
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
