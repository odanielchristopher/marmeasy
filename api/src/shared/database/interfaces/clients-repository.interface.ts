import { Client } from 'src/modules/clients/entities/client.entity';
import { SearchTermDto } from 'src/shared/dto/search-term.dto';
import { IPaginatedResponse } from 'src/shared/types';

export const IClientsRepository = Symbol('IClientsRepository');

export interface IClientsRepository {
  findManyByUserId(
    findManyDto: FindManyByUserIdDto,
  ): Promise<IPaginatedResponse<Client[]>>;

  findManyBySearchTerm(
    findManyBySearchTermDto: FindManyBySearchTermDto,
  ): Promise<IPaginatedResponse<Client[]>>;

  findFirstById(findFirstByIdDto: FindFirstClientByIdDto): Promise<Client>;

  findFirstByDocument(
    findFirstByDocumentDto: FindFirstClientByDocumentDto,
  ): Promise<Client>;

  create(createDto: CreateClientDto): Promise<Client>;

  update(updateDto: UpdateClientDto): Promise<Client>;

  delete(deleteDto: DeleteClientDto): Promise<void>;
}

export type FindManyBySearchTermDto = {
  userId: string;
  order: 'asc' | 'desc';
  searchTerm: SearchTermDto;
  page: number;
  perPage: number;
};

export type FindManyByUserIdDto = {
  userId: string;
  order: 'asc' | 'desc';
  page: number;
  perPage: number;
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
