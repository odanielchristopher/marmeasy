import { Injectable } from '@nestjs/common';
import {
  Customer,
  CustomerType,
} from 'src/modules/customers/entities/customer.entity';
import {
  CreateCustomerDto,
  FindFirstByIdDto,
  FindManyByUserIdDto,
  ICustomersRepository,
} from '../interfaces/customers-repository.interface';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CustomersRepository implements ICustomersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findManyByUserId(
    findManyByUserIdDto: FindManyByUserIdDto,
  ): Promise<Customer[]> {
    const { userId, order } = findManyByUserIdDto;

    const customers = await this.prismaService.customer.findMany({
      where: { userId },
      orderBy: {
        name: order,
      },
      select: {
        id: true,
        name: true,
        type: true,
        phone: true,
        color: true,
        balance: true,
      },
    });

    return customers.map((customer) => ({
      ...customer,
      type: CustomerType[customer.type],
    }));
  }

  async findFirstById(findFirstByIdDto: FindFirstByIdDto): Promise<Customer> {
    const { userId, customerId } = findFirstByIdDto;

    const customer = await this.prismaService.customer.findFirst({
      where: { userId, id: customerId },
      select: {
        id: true,
        name: true,
        type: true,
        phone: true,
        color: true,
        balance: true,
      },
    });

    return {
      ...customer,
      type: CustomerType[customer.type],
    };
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
      select: {
        id: true,
        name: true,
        type: true,
        phone: true,
        color: true,
        balance: true,
      },
    });

    return {
      ...createdCustomer,
      type: CustomerType[createdCustomer.type],
    };
  }
}
