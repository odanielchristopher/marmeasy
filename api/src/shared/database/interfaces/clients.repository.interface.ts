import { Client, ClientType } from 'src/modules/clients/entities/client.entity';
import { SelectUserInput, WhereUserInput } from './users.repository.interface';

export interface IClientsRepository {
  findMany(findManyDto: FindManyClientsParams): Promise<Client[]>;

  findFirst(findFirstDto: FindFirstClientParams): Promise<Client | null>;

  create(createDto: CreateClientParams): Promise<Client | null>;

  update(updateDto: UpdateClientParams): Promise<Client | null>;

  delete(deleteDto: DeleteClientParams): Promise<Client | null>;
}

export type FindManyClientsParams = {
  select?: SelectClientInput;
  where?: WhereClientInput;
};

export type FindUniqueClientParams = {
  select?: SelectClientInput;
  where: WhereClientInput;
};

export type FindFirstClientParams = {
  select?: SelectClientInput;
  where: WhereClientInput;
};

export type CreateClientParams = {
  data: DataClientInput;
  select?: SelectClientInput;
};

export type UpdateClientParams = {
  select?: SelectClientInput;
  where: WhereClientInput;
  data: DataClientInput;
};

export type DeleteClientParams = {
  select?: SelectClientInput;
  where: WhereClientInput;
};

export type WhereClientInput = {
  id?: string;
  userId?: string;
  name?: string;
  phone?: string | null;
  address?: string | null;
  type?: ClientType;
  document?: string | null;
  balance?: number;
  user?: WhereUserInput;
} | null;

export type SelectClientInput = {
  id?: boolean;
  userId?: boolean;
  name?: boolean;
  phone?: boolean;
  address?: boolean;
  type?: boolean;
  document?: boolean;
  balance?: boolean;
  user?: SelectUserInput;
} | null;

export type DataClientInput = {
  id?: string;
  userId?: string;
  name: string;
  phone?: string | null;
  address?: string | null;
  type: ClientType;
  document?: string | null;
  balance?: number;
};
