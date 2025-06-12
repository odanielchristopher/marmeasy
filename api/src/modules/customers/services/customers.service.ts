import { Inject, Injectable } from '@nestjs/common';
import { ICustomersRepository } from 'src/shared/database/interfaces/customers-repository.interface';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { IValidateCustomerOwnershipService } from '../interfaces/validate-customer-ownership-service.interface';

@Injectable()
export class CustomersService {
  constructor(
    @Inject(ICustomersRepository)
    private readonly customersRepository: ICustomersRepository,
    @Inject(IValidateCustomerOwnershipService)
    private readonly validateCustomerOwnershipService: IValidateCustomerOwnershipService,
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

  async update(
    userId: string,
    customerId: string,
    updateCustomerDto: UpdateCustomerDto,
  ) {
    await this.validateCustomerOwnershipService.validate(userId, customerId);

    const { name, type, color, initialBalance, phone } = updateCustomerDto;

    return this.customersRepository.update({
      customerId,
      data: {
        name,
        type,
        color,
        balance: initialBalance,
        phone,
      },
    });
  }

  async delete(userId: string, customerId: string) {
    await this.validateCustomerOwnershipService.validate(userId, customerId);

    await this.customersRepository.delete(customerId);
  }
}
