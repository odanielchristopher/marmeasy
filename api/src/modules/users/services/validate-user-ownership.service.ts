import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from 'src/shared/database/repositories/users.repository';

@Injectable()
export class ValidateUserOwnershipService {
  constructor(private readonly usersRepository: UsersRepository) {}

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
