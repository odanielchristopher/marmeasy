import { SearchTermDto } from 'src/shared/dto/search-term.dto';
import { IPaginatedResponse } from 'src/shared/types';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { Client } from '../entities/client.entity';

export const IClientsService = Symbol('IClientsService');

export interface IClientsService {
  findAllByUserId(
    userId: string,
    page: number,
    perPage: number,
  ): Promise<IPaginatedResponse<Client[]>>;

  findAllBySearchTerm(
    userId: string,
    searchTerm: SearchTermDto,
    page: number,
    perPage: number,
  ): Promise<IPaginatedResponse<Client[]>>;

  findOneByUserId(userId: string, clientId: string): Promise<Client>;

  create(userId: string, createClientDto: CreateClientDto): Promise<Client>;

  update(
    userId: string,
    clientId: string,
    updateClientDto: UpdateClientDto,
  ): Promise<Client>;

  remove(userId: string, clientId: string): Promise<void>;
}
