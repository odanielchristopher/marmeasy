import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICustomersRepository } from 'src/shared/database/interfaces/customers-repository.interface';

@Injectable()
export class ValidateCustomerOwnershipService {
  constructor(
    @Inject(ICustomersRepository)
    private readonly customersRepository: ICustomersRepository,
  ) {}

  async validate(userId: string, customerId: string) {
    const isOwner = await this.customersRepository.findFirstById({
      userId,
      customerId,
    });

    if (!isOwner) {
      throw new NotFoundException('Cliente não encontrado.');
    }

    return isOwner;
  }
}
