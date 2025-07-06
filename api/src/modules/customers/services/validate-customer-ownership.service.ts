import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICustomersRepository } from 'src/shared/database/interfaces/customers-repository.interface';
import { IValidateCustomerOwnershipService } from '../interfaces/validate-customer-ownership-service.interface';

@Injectable()
export class ValidateCustomerOwnershipService
  implements IValidateCustomerOwnershipService
{
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
