import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICustomersRepository } from 'src/shared/database/interfaces/customers-repository.interface';

@Injectable()
export class ComputeCustomerOwnershipService {
  constructor(
    @Inject(ICustomersRepository)
    private readonly customersRepository: ICustomersRepository,
  ) {}

  async compute(customerId: string, amount: number, balance: number) {
    const calculated = balance - amount;

    const costumer = await this.customersRepository.updateBalance(
      customerId,
      calculated,
    );

    if (!costumer) {
      throw new NotFoundException('Cliente não encontrado.');
    }

    return costumer;
  }
}
