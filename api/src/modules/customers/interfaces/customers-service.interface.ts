import { IPaginatedResponse } from 'src/shared/types';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { Customer, CustomerType } from '../entities/customer.entity';

export const ICustomersService = Symbol('ICustomersService');

export interface ICustomersService {
  findAll(
    userId: string,
    filters: {
      order: string;
      customerType?: CustomerType;
      page: number;
      perPage: number;
    },
  ): Promise<IPaginatedResponse<Customer[]>>;

  findAllBySeachTerm(
    userId: string,
    filters: {
      order: string;
      searchTerm: string;
    },
  ): Promise<Customer[]>;

  findOne(userId: string, customerId: string): Promise<Customer>;

  create(
    userId: string,
    createCustomerDto: CreateCustomerDto,
  ): Promise<Customer>;

  update(
    userId: string,
    customerId: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer>;

  delete(userId: string, customerId: string): Promise<void>;
}
