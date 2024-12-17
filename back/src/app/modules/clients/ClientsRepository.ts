import { prismaClient } from '../../../database';
import { IClient } from './clientEntity';

export class ClientsRepository {
  async findByDocument(document: string) {
    const client = await prismaClient.client.findUnique({
      where: {
        document,
      },
    });

    return client;
  }

  async findById(id: string, userId: string) {
    const client = await prismaClient.client.findUnique({
      where: {
      id,
      user_id: userId,
      },
    });

    return client;
  }

  async getAll(userId: string) {
    const clients = await prismaClient.client.findMany({
      where: {
        user_id: userId,
      },
      select: {
        id: true,
        user_id: true,
        name: true,
        phone: true,
        address: true,
        type: true,
        document: true,
        balance: true,
      },
    });

    return clients;
  }

  async create(client: IClient) {
    const newClient = await prismaClient.client.create({
      data: {
        name: client.name,
        phone: client.phone as string,
        address: client.address as string,
        type: client.type,
        document: client.document as string,
        balance: client.balance as number,
        user_id: client.userId,
      },
      select: {
        id: true,
        user_id: true,
        name: true,
        phone: true,
        address: true,
        type: true,
        document: true,
        balance: true,
      },
    });

    return newClient;
  }

  async delete(id: string, userId: string) {
    await prismaClient.client.delete({
      where: {
        id,
        user_id: userId,
      },
    });
  }

  async update({userId, ...client}: IClient) {
    const updatedClient = await prismaClient.client.update({
      data: {
        ...client,
        balance: client.balance as number,
      },
      where: {
        id: client.id,
        user_id: userId,
      },
      select: {
        id: true,
        user_id: true,
        name: true,
        phone: true,
        address: true,
        type: true,
        document: true,
        balance: true,
      },
    });

    return updatedClient;
  }
}
