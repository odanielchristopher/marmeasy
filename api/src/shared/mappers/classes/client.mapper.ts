import { Client as PrismaClient } from '@prisma/client';
import { Client, ClientType } from 'src/modules/clients/entities/client.entity';
import { IDataMapper } from '../interfaces/data-mapper.interface';

export class ClientMapper implements IDataMapper<PrismaClient, Client> {
  private static instance: ClientMapper;

  static getInstance() {
    if (!this.instance) {
      return new ClientMapper();
    }

    return this.instance;
  }

  private constructor() {}

  toDomain(persistenteEntity: PrismaClient | null): Client {
    if (!persistenteEntity) {
      return null;
    }

    const { id, name, type, address, balance, document, phone } =
      persistenteEntity;

    return {
      id,
      name,
      balance,
      phone: phone ?? undefined,
      document: document ?? undefined,
      address: address ?? undefined,
      type: ClientType[type],
    };
  }
}
