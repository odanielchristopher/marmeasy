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
      name: data.name,
      phone: data.phone,
      address: data.address,
      type: data.type,
      document: data.document,
      balance: data.balance,
    };
  }

  private parseSelectInput(select: SelectClientInput) {
    if (!select) return undefined;

    const parsedSelect = {
      id: select.id ?? false,
      userId: select.userId ?? false,
      name: select.name ?? false,
      phone: select.phone ?? false,
      address: select.address ?? false,
      type: select.type ?? false,
      document: select.document ?? false,
      balance: select.balance ?? false,
      user: select.user ? { select: select.user } : undefined,
    };

    // Verifica se ao menos um campo é `true`
    const hasTruthyValue = Object.values(parsedSelect).some(
      (value) => value === true || typeof value === 'object',
    );

    return hasTruthyValue ? parsedSelect : undefined;
  }

  private parseWhereInput(where: WhereClientInput) {
    return {
      ...(where.id && { id: where.id }),
      ...(where.userId && { userId: where.userId }),
      ...(where.name && { name: where.name }),
      ...(where.phone && { phone: where.phone }),
      ...(where.address && { address: where.address }),
      ...(where.type && { type: { equals: where.type } }),
      ...(where.document && { document: where.document }),
      ...(where.balance && { balance: where.balance }),
      ...(where.user && { user: where.user }),
    };
  }

  private clientMapper(clientData?: {
    id: string;
    userId: string;
    name: string;
    phone: string | null;
    address: string | null;
    type: $Enums.ClientType;
    document: string | null;
    balance: number;
  }): Client | null {
    if (!clientData) {
      return null;
    }

    return {
      ...clientData,
      type: clientData.type as Client['type'],
    };
  }
}
