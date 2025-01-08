import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUsersRepository } from 'src/shared/database/interfaces/users.repository.interface';

@Injectable()
export class ValidateUserOwnershipService {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async validate(userId: string) {
    const isOwner = await this.usersRepository.findFirst({
      where: { id: userId },
    });

    if (!isOwner) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return isOwner;
  }
}
