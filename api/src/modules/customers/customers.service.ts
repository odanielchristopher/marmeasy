import { Inject, Injectable } from '@nestjs/common';
import { ICustomersRepository } from 'src/shared/database/interfaces/customers-repository.interface';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @Inject(ICustomersRepository)
    private readonly customersRepository: ICustomersRepository,
  ) {}

  findAll(
    userId: string,
    filters: {
      order: string;
      page: number;
      perPage: number;
    },
  ) {
    const { order, page, perPage } = filters;

    return this.customersRepository.findManyByUserId({
      userId,
      order: order === 'asc' ? 'asc' : 'desc',
      page,
      perPage,
    });
  }

  findAllBySeachTerm(
    userId: string,
    filters: {
      order: string;
      searchTerm: string;
    },
  ) {
    const { order, searchTerm } = filters;

    return this.customersRepository.findManyByTerm({
      userId,
      order: order === 'asc' ? 'asc' : 'desc',
      searchTerm,
    });
  }

  findOne(userId: string, customerId: string) {
    return this.customersRepository.findFirstById({ userId, customerId });
  }

  create(userId: string, createCustomerDto: CreateCustomerDto) {
    const { name, color, type, phone, initialBalance } = createCustomerDto;

    return this.customersRepository.create({
      userId,
      data: {
        name,
        color,
        type,
        phone,
        balance: initialBalance,
      },
    });
  }
}
