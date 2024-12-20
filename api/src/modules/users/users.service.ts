import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

import { compare, hash } from 'bcryptjs';
import { UsersRespository } from 'src/shared/repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRespository) {}

  async getUserById(userId: string) {
    return this.usersRepository.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
      },
    });
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.validateUserOwnership(userId);

    const isPasswordValid = await compare(
      updateUserDto.currentPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha inválida.');
    }

    if (user.email !== updateUserDto.email) {
      const emailAlredyInUse = this.usersRepository.findUnique({
        where: {
          email: updateUserDto.email,
        },
      });

      if (emailAlredyInUse) {
        throw new ConflictException('Esse e-mail já está em uso.');
      }
    }

    let hashedNewPassword: string;
    if (updateUserDto.newPassword) {
      hashedNewPassword = await hash(updateUserDto.newPassword, 10);
    }

    return this.usersRepository.update({
      where: {
        id: userId,
      },
      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
        password: updateUserDto.newPassword ? hashedNewPassword : user.password,
      },
      select: {
        name: true,
        email: true,
      },
    });
  }

  async remove(userId: string) {
    await this.validateUserOwnership(userId);

    await this.usersRepository.delete({
      where: { id: userId },
    });

    return null;
  }

  private async validateUserOwnership(userId: string) {
    const isOwner = await this.usersRepository.findFirst({
      where: { id: userId },
    });

    if (!isOwner) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return isOwner;
  }
}
