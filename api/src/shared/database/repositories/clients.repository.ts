import { Inject, Injectable } from '@nestjs/common';
import { Client as PrismaClient } from '@prisma/client';

import { Client } from 'src/modules/clients/entities/client.entity';
import { DataMapperType } from 'src/shared/mappers/factories/data-mappers.factory';
import { IDataMappersFactory } from 'src/shared/mappers/interfaces/data-mappers-factory.interface';
import { IPaginatedResponse } from 'src/shared/types';
import {
  CreateClientDto,
  DeleteClientDto,
  FindFirstClientByDocumentDto,
  FindFirstClientByIdDto,
  FindManyBySearchTermDto,
  FindManyByUserIdDto,
  IClientsRepository,
  UpdateClientDto,
} from '../interfaces/clients-repository.interface';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ClientsRepository implements IClientsRepository {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(IDataMappersFactory)
    private readonly dataMappersFactory: IDataMappersFactory,
  ) {}

  async findManyBySearchTerm(
    findManyBySearchTermDto: FindManyBySearchTermDto,
  ): Promise<IPaginatedResponse<Client[]>> {
    const { userId, order, searchTerm, page, perPage } =
      findManyBySearchTermDto;

    const skip = (page - 1) * perPage;

    const { query } = searchTerm;

    const clients = await this.prismaService.client.findMany({
      where: {
        userId,
        active: true,
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
      orderBy: { name: order },
      take: perPage,
      skip,
    });

    const totalItems = await this.prismaService.client.count({
      where: {
        userId,
        active: true,
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });

    return {
      data: clients.map((client) => this.parser(client)),
      items: totalItems,
    };
  }

  async findManyByUserId(
    findManyDto: FindManyByUserIdDto,
  ): Promise<IPaginatedResponse<Client[]>> {
    const { userId, order, page, perPage } = findManyDto;

    // Calcula a posição inicial
    const skip = (page - 1) * perPage;

    const clients = await this.prismaService.client.findMany({
      where: { userId, active: true },
      orderBy: { name: order },
      take: perPage,
      skip,
    });

    // Conta o total de registros
    const totalItems = await this.prismaService.client.count({
      where: { userId, active: true },
    });

    return {
      data: clients.map((client) => this.parser(client)),
      items: totalItems,
    };
  }

  async findFirstById(
    findFirstByIdDto: FindFirstClientByIdDto,
  ): Promise<Client> {
    const { userId, id } = findFirstByIdDto;

    const client = await this.prismaService.client.findFirst({
      where: { userId, id },
    });

    return this.parser(client);
  }

  async findFirstByDocument(
    findFirstByDocumentDto: FindFirstClientByDocumentDto,
  ): Promise<Client> {
    const { userId, document } = findFirstByDocumentDto;

    const client = await this.prismaService.client.findFirst({
      where: { userId, document },
    });

    return this.parser(client);
  }

  async create(createDto: CreateClientDto): Promise<Client> {
    const { data, userId } = createDto;

    const createdClient = await this.prismaService.client.create({
      data: {
        userId,
        ...data,
      },
    });

    return this.parser(createdClient);
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

    return this.parser(updatedClient);
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

  private parser(prismaClient: PrismaClient): Client {
    return this.dataMappersFactory
      .getInstance<PrismaClient, Client>(DataMapperType.CLIENT)
      .toDomain(prismaClient);
  }
}
