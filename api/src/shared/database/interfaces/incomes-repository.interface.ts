import { Income } from 'src/modules/dashboard/entities/income.entity';

export const IIncomesRepository = Symbol('IIncomesRepository');

export interface IIncomesRepository {
  findManyByUser(findManyDto: findManyDto): Promise<Income[]>;
}

export type findManyDto = {
  userId: string;
};
