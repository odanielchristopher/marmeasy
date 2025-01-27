import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUsersRepository } from 'src/shared/database/interfaces/users-repository.interface';
import { IValidateUserOwnershipService } from '../interfaces/validate-user-ownership-service.interface';

@Injectable()
export class ValidateUserOwnershipService
  implements IValidateUserOwnershipService
{
  constructor(
    @Inject(IUsersRepository)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async validate(userId: string) {
    const isOwner = await this.usersRepository.findUniquetById({ userId });

    if (!isOwner) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return isOwner;
  }
}
