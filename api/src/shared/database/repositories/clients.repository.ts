import { Injectable } from '@nestjs/common';
import { $Enums } from '@prisma/client';
import { Client } from 'src/modules/clients/entities/client.entity';
import {
  CreateClientParams,
  DataClientInput,
  DeleteClientParams,
  FindFirstClientParams,
  FindManyClientsParams,
  IClientsRepository,
  SelectClientInput,
  UpdateClientParams,
  WhereClientInput,
} from '../interfaces/clients.repository.interface';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ClientsRepository implements IClientsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(findManyDto: FindManyClientsParams) {
    const { where, select } = findManyDto;

    const clientsData = await this.prismaService.client.findMany({
      where: this.parseWhereInput(where),
      select: this.parseSelectInput(select),
    });

    return clientsData.map((clientData) => this.clientMapper(clientData));
  }

  async findFirst(findFirstDto: FindFirstClientParams) {
    const { where, select } = findFirstDto;

    const clientData = await this.prismaService.client.findFirst({
      where: this.parseWhereInput(where),
      select: this.parseSelectInput(select),
    });

    return this.clientMapper(clientData);
  }

  async create(createDto: CreateClientParams) {
    const { data, select } = createDto;

    const clientData = await this.prismaService.client.create({
      data: this.parseDataInput(data),
      select: this.parseSelectInput(select),
    });

    return this.clientMapper(clientData);
  }

  async update(updateDto: UpdateClientParams) {
    const { data, where, select } = updateDto;

    const updatedClientData = await this.prismaService.client.update({
      where: this.parseWhereInput(where),
      data: this.parseDataInput(data),
      select: this.parseSelectInput(select),
    });

    return this.clientMapper(updatedClientData);
  }

  async delete(deleteDto: DeleteClientParams) {
    const { where, select } = deleteDto;

    const deletedClientData = await this.prismaService.client.delete({
      where: this.parseWhereInput(where),
      select: this.parseSelectInput(select),
    });

    return this.clientMapper(deletedClientData);
  }

  private parseDataInput(data: DataClientInput) {
    return {
      id: data.id,
      userId: data.userId,
      name: data.id,
      phone: data.phone,
      address: data.address,
      type: data.type,
      document: data.document,
      balance: data.balance,
    };
  }

  private parseSelectInput(select: SelectClientInput) {
    return {
      id: select.id,
      userId: select.userId,
      name: select.id,
      phone: select.phone,
      address: select.address,
      type: select.type,
      document: select.document,
      balance: select.balance,
      user: {
        select: select.user,
      },
    };
  }

  private parseWhereInput(where: WhereClientInput) {
    return {
      id: where.id,
      userId: where.userId,
      name: where.id,
      phone: where.phone,
      address: where.address,
      type: {
        equals: where.type,
      },
      document: where.document,
      balance: where.balance,
      user: where.user,
    };
  }

  private clientMapper(clientData: {
    id: string;
    userId: string;
    name: string;
    phone: string | null;
    address: string | null;
    type: $Enums.ClientType;
    document: string | null;
    balance: number;
  }): Client {
    return {
      ...clientData,
      type: clientData.type as Client['type'],
    };
  }
}
