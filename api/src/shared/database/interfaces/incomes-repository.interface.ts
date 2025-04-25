import { Income } from 'src/modules/dashboard/entities/income.entity';
import { PaymentType } from 'src/modules/payments/entities/payment.entity';
import { DateRangeDto } from 'src/shared/dto/date-range.dto';

export const IIncomesRepository = Symbol('IIncomesRepository');

export interface IIncomesRepository {
  findManyByUser(findManyDto: FindManyDto): Promise<Partial<Income>[]>;

  findManyInGroupByUserId(findManyDto: FindManyDto): Promise<Income[]>;

  findManyInGroupByCategory(
    findManyDto: FindManyDto,
  ): Promise<Partial<Income>[]>;
}

export type FindManyDto = {
  userId: string;
  dateRange: DateRangeDto;
  type?: PaymentType;
};
