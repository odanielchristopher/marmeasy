import { Inject, Injectable } from '@nestjs/common';
import { ICustomersRepository } from 'src/shared/database/interfaces/customers-repository.interface';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @Inject(ICustomersRepository)
    private readonly customersRepository: ICustomersRepository,
  ) {}

  findAll(userId: string) {
    return this.customersRepository.findManyByUserId({ userId, order: 'asc' });
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
