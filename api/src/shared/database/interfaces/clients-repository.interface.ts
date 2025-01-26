import { Client } from 'src/modules/clients/entities/client.entity';

export const IClientsRepository = Symbol('IClientsRepository');

export interface IClientsRepository {
  findManyByUserId(findManyDto: FindManyByUserIdDto): Promise<Client[]>;

  findFirstById(findFirstByIdDto: FindFirstClientByIdDto): Promise<Client>;

  findFirstByDocument(
    findFirstByDocumentDto: FindFirstClientByDocumentDto,
  ): Promise<Client>;

  create(createDto: CreateClientDto): Promise<Client>;

  update(updateDto: UpdateClientDto): Promise<Client>;

  delete(deleteDto: DeleteClientDto): Promise<void>;
}

export type FindManyByUserIdDto = {
  userId: string;
  order: 'asc' | 'desc';
};

export type FindFirstClientByIdDto = {
  userId: string;
  id: string;
};

export type FindFirstClientByDocumentDto = {
  userId: string;
  document: string;
};

export type CreateClientDto = {
  data: Client | Omit<Client, 'id'>;
  userId: string;
};

export type UpdateClientDto = {
  userId: string;
  data: Client;
};

export type DeleteClientDto = {
  userId: string;
  id: string;
};
