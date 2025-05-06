import { Inject, Injectable } from '@nestjs/common';
import { Customer as PrismaCustomer } from '@prisma/client';
import { Customer } from 'src/modules/customers/entities/customer.entity';
import { DataMapperType } from 'src/shared/mappers/factories/data-mappers.factory';
import { IDataMappersFactory } from 'src/shared/mappers/interfaces/data-mappers-factory.interface';
import {
  CreateCustomerDto,
  FindFirstByIdDto,
  FindManyByUserIdDto,
  ICustomersRepository,
} from '../interfaces/customers-repository.interface';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CustomersRepository implements ICustomersRepository {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(IDataMappersFactory)
    private readonly dataMappersFactory: IDataMappersFactory,
  ) {}

  async findManyByUserId(
    findManyByUserIdDto: FindManyByUserIdDto,
  ): Promise<Customer[]> {
    const { userId, order } = findManyByUserIdDto;

    const customers = await this.prismaService.customer.findMany({
      where: { userId },
      orderBy: {
        name: order,
      },
    });

    return customers.map((customer) => this.parser(customer));
  }

  async findFirstById(findFirstByIdDto: FindFirstByIdDto): Promise<Customer> {
    const { userId, customerId } = findFirstByIdDto;

    const customer = await this.prismaService.customer.findFirst({
      where: { userId, id: customerId },
    });

    return this.parser(customer);
  }

  async create(createDto: CreateCustomerDto): Promise<Customer> {
    const { data, userId } = createDto;

    const { name, type, color, phone, balance } = data;

    const createdCustomer = await this.prismaService.customer.create({
      data: {
        userId,
        name,
        type,
        color,
        phone,
        balance,
      },
    });

    return this.parser(createdCustomer);
  }

  private parser(prismaCustomer: PrismaCustomer) {
    return this.dataMappersFactory
      .getInstance<PrismaCustomer, Customer>(DataMapperType.CUSTOMER)
      .toDomain(prismaCustomer);
  }
}
