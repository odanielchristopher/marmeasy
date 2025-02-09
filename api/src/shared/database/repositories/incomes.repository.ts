import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

import { Income } from 'src/modules/dashboard/entities/income.entity';

import {
  findManyDto,
  IIncomesRepository,
} from '../interfaces/incomes-repository.interface';

import {
  IncomeMapper,
  PrismaPaymentWithClientName,
} from '../mappers/income.mapper';

@Injectable()
export class IncomesRepository implements IIncomesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findManyByUserId(findManyDto: findManyDto): Promise<Income[]> {
    const { userId, dateRange } = findManyDto;

    const { fromDate, toDate } = dateRange;

    const incomes = await this.prismaService.payment.findMany({
      where: { userId, date: { gte: fromDate, lte: toDate } },
      include: {
        client: {
          select: {
            name: true,
          },
        },
      },
    });

    return incomes.map(this.parser);
  }

  private parser(prismaIncome: PrismaPaymentWithClientName) {
    return IncomeMapper.getInstance().toDomain(prismaIncome);
  }
}
