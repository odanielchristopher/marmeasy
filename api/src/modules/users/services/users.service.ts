import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';

import { compare, hash } from 'bcryptjs';
import { IUsersRepository } from 'src/shared/database/interfaces/users.repository.interface';
import { ValidateUserOwnershipService } from './validate-user-ownership.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
    private readonly validateUserOwnershipService: ValidateUserOwnershipService,
  ) {}

  async getUserById(userId: string) {
    await this.validateUserOwnershipService.validate(userId);

    return this.usersRepository.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
      },
    });
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.validateUserOwnershipService.validate(userId);

    const isPasswordValid = await compare(
      updateUserDto.currentPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha inválida.');
    }

    if (user.email !== updateUserDto.email) {
      const emailAlredyInUse = await this.usersRepository.findUnique({
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
    await this.validateUserOwnershipService.validate(userId);

    await this.usersRepository.delete({
      where: { id: userId },
    });

    return null;
  }
}
