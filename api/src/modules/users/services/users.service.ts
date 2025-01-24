import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';

import { compare, hash } from 'bcryptjs';
import { UsersRepository } from 'src/shared/database/repositories/users.repository';
import { ValidateUserOwnershipService } from './validate-user-ownership.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly validateUserOwnershipService: ValidateUserOwnershipService,
  ) {}

  async getUserById(userId: string) {
    await this.validateUserOwnershipService.validate(userId);

    const { id, email, name } = await this.usersRepository.findUniquetById({ userId });

    return { id, email, name };
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
      const emailAlredyInUse = await this.usersRepository.findUniqueByEmail({
        email: updateUserDto.email,
      });

      if (emailAlredyInUse) {
        throw new ConflictException('Esse e-mail já está em uso.');
      }
    }

    let hashedNewPassword: string;
    if (updateUserDto.newPassword) {
      hashedNewPassword = await hash(updateUserDto.newPassword, 10);
    }

    const { id, name, email } = await this.usersRepository.update({
      userId,
      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
        password: updateUserDto.newPassword ? hashedNewPassword : user.password,
      },
    });

    return { id, name, email };
  }

  async remove(userId: string) {
    await this.validateUserOwnershipService.validate(userId);

    await this.usersRepository.delete({ userId });

    return null;
  }
}
