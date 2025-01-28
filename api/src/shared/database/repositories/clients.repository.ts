import { Injectable } from '@nestjs/common';
import { Client } from 'src/modules/clients/entities/client.entity';
import {
  CreateClientDto,
  DeleteClientDto,
  FindFirstClientByDocumentDto,
  FindFirstClientByIdDto,
  FindManyByUserIdDto,
  IClientsRepository,
  UpdateClientDto,
} from '../interfaces/clients-repository.interface';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ClientsRepository implements IClientsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findManyByUserId(findManyDto: FindManyByUserIdDto): Promise<Client[]> {
    const { userId, order } = findManyDto;

    const clients = await this.prismaService.client.findMany({
      where: { userId, active: true },
      orderBy: { name: order },
    });

    return clients.map(Client.parse);
  }

  async findFirstById(
    findFirstByIdDto: FindFirstClientByIdDto,
  ): Promise<Client> {
    const { userId, id } = findFirstByIdDto;

    const client = await this.prismaService.client.findFirst({
      where: { userId, id },
    });

    return Client.parse(client);
  }

  async findFirstByDocument(
    findFirstByDocumentDto: FindFirstClientByDocumentDto,
  ): Promise<Client> {
    const { userId, document } = findFirstByDocumentDto;

    const client = await this.prismaService.client.findFirst({
      where: { userId, document },
    });

    return Client.parse(client);
  }

  async create(createDto: CreateClientDto): Promise<Client> {
    const { data, userId } = createDto;

    const createdClient = await this.prismaService.client.create({
      data: {
        userId,
        ...data,
      },
    });

    return Client.parse(createdClient);
  }

  async update(updateDto: UpdateClientDto): Promise<Client> {
    const { data, userId } = updateDto;

    const updatedClient = await this.prismaService.client.update({
      where: { id: data.id, userId },
      data: {
        ...data,
        active: true,
      },
    });

    return Client.parse(updatedClient);
  }

  async delete(deleteDto: DeleteClientDto): Promise<void> {
    const { userId, id } = deleteDto;

    await this.prismaService.client.update({
      where: { userId, id },
      data: {
        active: false,
      },
    });
  }
}
