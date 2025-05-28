// import { SearchTermDto } from 'src/shared/dto/search-term.dto';
// import { IPaginatedResponse } from 'src/shared/types';

import { Customer } from 'src/modules/customers/entities/customer.entity';
import { IPaginatedResponse } from 'src/shared/types';

export const ICustomersRepository = Symbol('ICustomersRepository');

export interface ICustomersRepository {
  findManyByUserId(
    findManyByUserIdDto: FindManyByUserIdDto,
  ): Promise<IPaginatedResponse<Customer[]>>;

  findManyByTerm(findManyByUserIdDto: FindManyByTermDto): Promise<Customer[]>;

  findFirstById(findFirstByIdDto: FindFirstByIdDto): Promise<Customer>;

  create(createDto: CreateCustomerDto): Promise<Customer>;

  update(updateDto: UpdateCustomerDto): Promise<Customer>;

  delete(customerId: string): Promise<void>;
}

// export type FindManyBySearchTermDto = {
//   userId: string;
//   order: 'asc' | 'desc';
//   searchTerm: SearchTermDto;
//   page: number;
//   perPage: number;
// };

export type FindManyByUserIdDto = {
  userId: string;
  order: 'asc' | 'desc';
  page: number;
  perPage: number;
};

export type FindManyByTermDto = {
  userId: string;
  order: 'asc' | 'desc';
  searchTerm: string;
};

export type FindFirstByIdDto = {
  userId: string;
  customerId: string;
};

// export type FindFirstCustomerByIdDto = {
//   userId: string;
//   id: string;
// };

// export type FindFirstCustomerByDocumentDto = {
//   userId: string;
//   document: string;
// };

export type CreateCustomerDto = {
  data: Omit<Customer, 'id'>;
  userId: string;
};

export type UpdateCustomerDto = {
  customerId: string;
  data: Omit<Customer, 'id'>;
};

// export type DeleteCustomerDto = {
//   userId: string;
//   id: string;
// };
