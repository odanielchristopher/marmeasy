// import { SearchTermDto } from 'src/shared/dto/search-term.dto';
// import { IPaginatedResponse } from 'src/shared/types';

import { Customer } from 'src/modules/customers/entities/customer.entity';

export const ICustomersRepository = Symbol('ICustomersRepository');

export interface ICustomersRepository {
  findManyByUserId(
    findManyByUserIdDto: FindManyByUserIdDto,
  ): Promise<Customer[]>;

  findFirstById(findFirstByIdDto: FindFirstByIdDto): Promise<Customer>;

  create(createDto: CreateCustomerDto): Promise<Customer>;
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

// export type UpdateCustomerDto = {
//   userId: string;
//   data: Customer;
// };

// export type DeleteCustomerDto = {
//   userId: string;
//   id: string;
// };
