import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRespository } from 'src/shared/database/repositories/users.repository';

@Injectable()
export class ValidateUserOwnershipService {
  constructor(private readonly usersRepository: UsersRespository) {}

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
