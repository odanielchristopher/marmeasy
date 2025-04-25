// import { SearchTermDto } from 'src/shared/dto/search-term.dto';
// import { IPaginatedResponse } from 'src/shared/types';

// export const ICustomersRepository = Symbol('ICustomersRepository');

// export interface ICustomersRepository {
//   findManyByUserId(
//     findManyDto: FindManyByUserIdDto,
//   ): Promise<IPaginatedResponse<Customer[]>>;

//   findManyBySearchTerm(
//     findManyBySearchTermDto: FindManyBySearchTermDto,
//   ): Promise<IPaginatedResponse<Customer[]>>;

//   findFirstById(findFirstByIdDto: FindFirstCustomerByIdDto): Promise<Customer>;

//   findFirstByDocument(
//     findFirstByDocumentDto: FindFirstCustomerByDocumentDto,
//   ): Promise<Customer>;

//   create(createDto: CreateCustomerDto): Promise<Customer>;

//   update(updateDto: UpdateCustomerDto): Promise<Customer>;

//   delete(deleteDto: DeleteCustomerDto): Promise<void>;
// }

// export type FindManyBySearchTermDto = {
//   userId: string;
//   order: 'asc' | 'desc';
//   searchTerm: SearchTermDto;
//   page: number;
//   perPage: number;
// };

// export type FindManyByUserIdDto = {
//   userId: string;
//   order: 'asc' | 'desc';
//   page: number;
//   perPage: number;
// };

// export type FindFirstCustomerByIdDto = {
//   userId: string;
//   id: string;
// };

// export type FindFirstCustomerByDocumentDto = {
//   userId: string;
//   document: string;
// };

// export type CreateCustomerDto = {
//   data: Customer | Omit<Customer, 'id'>;
//   userId: string;
// };

// export type UpdateCustomerDto = {
//   userId: string;
//   data: Customer;
// };

// export type DeleteCustomerDto = {
//   userId: string;
//   id: string;
// };
