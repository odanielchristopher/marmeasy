import { Inject, Injectable } from '@nestjs/common';
import { Customer as PrismaCustomer } from '@prisma/client';
import { Customer } from 'src/modules/customers/entities/customer.entity';
import { DataMapperType } from 'src/shared/mappers/factories/data-mappers.factory';
import { IDataMappersFactory } from 'src/shared/mappers/interfaces/data-mappers-factory.interface';
import { IPaginatedResponse } from 'src/shared/types';
import {
  CreateCustomerDto,
  FindFirstByIdDto,
  FindManyByTermDto,
  FindManyByUserIdDto,
  ICustomersRepository,
  UpdateCustomerDto,
} from '../interfaces/customers-repository.interface';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CustomersRepository implements ICustomersRepository {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(IDataMappersFactory)
    private readonly dataMappersFactory: IDataMappersFactory,
  ) {}

  async findManyByTerm(
    findManyByTermDto: FindManyByTermDto,
  ): Promise<Customer[]> {
    const { userId, order, searchTerm } = findManyByTermDto;

    const customers = await this.prismaService.customer.findMany({
      where: {
        userId,
        isActive: true,
        name: { contains: searchTerm, mode: 'insensitive' },
      },
      orderBy: {
        name: order,
      },
    });

    return customers.map((customer) => this.parser(customer));
  }

  async findManyByUserId(
    findManyByUserIdDto: FindManyByUserIdDto,
  ): Promise<IPaginatedResponse<Customer[]>> {
    const { userId, order, page, perPage } = findManyByUserIdDto;

    // Calcula a posição inicial
    const skip = (page - 1) * perPage;

    const customers = await this.prismaService.customer.findMany({
      where: { userId, isActive: true },
      orderBy: {
        name: order,
      },
      take: perPage,
      skip,
    });

    const items = await this.prismaService.customer.count({
      where: { userId, isActive: true },
    });

    return {
      data: customers.map((customer) => this.parser(customer)),
      items,
    };
  }

  async findFirstById(findFirstByIdDto: FindFirstByIdDto): Promise<Customer> {
    const { userId, customerId } = findFirstByIdDto;

    const customer = await this.prismaService.customer.findFirst({
      where: { userId, id: customerId, isActive: true },
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

  async update(updateDto: UpdateCustomerDto): Promise<Customer> {
    const { data, customerId } = updateDto;

    const { name, type, color, phone, balance } = data;

    const updatedCustomer = await this.prismaService.customer.update({
      where: { id: customerId },
      data: {
        name,
        type,
        color,
        phone,
        balance,
      },
    });

    return this.parser(updatedCustomer);
  }

  async delete(customerId: string) {
    await this.prismaService.customer.update({
      where: { id: customerId },
      data: {
        isActive: false,
      },
    });
  }

  async updateBalance(customerId: string, balance: number): Promise<Customer> {
    const updatedCustomer = await this.prismaService.customer.update({
      where: { id: customerId },
      data: { balance },
    });

    return this.parser(updatedCustomer);
  }

  private parser(prismaCustomer: PrismaCustomer) {
    return this.dataMappersFactory
      .getInstance<PrismaCustomer, Customer>(DataMapperType.CUSTOMER)
      .toDomain(prismaCustomer);
  }
}
