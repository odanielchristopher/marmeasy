import { Income } from 'src/modules/dashboard/entities/income.entity';
import { DateRangeDto } from 'src/shared/dto/date-range.dto';

export const IIncomesRepository = Symbol('IIncomesRepository');

export interface IIncomesRepository {
  findManyByUserId(findManyDto: findManyDto): Promise<Income[]>;

  findManyByCategory(findManyDto: findManyDto): Promise<Partial<Income>[]>;
}

export type findManyDto = {
  userId: string;
  dateRange: DateRangeDto;
};
