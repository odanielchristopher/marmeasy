import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';

import { compare, hash } from 'bcryptjs';
import { IUsersRepository } from 'src/shared/database/interfaces/users-repository.interface';
import { IUsersService } from '../interfaces/users-service.interface';
import { IValidateUserOwnershipService } from '../interfaces/validate-user-ownership-service.interface';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(IUsersRepository)
    private readonly usersRepository: IUsersRepository,
    @Inject(IValidateUserOwnershipService)
    private readonly validateUserOwnershipService: IValidateUserOwnershipService,
  ) {}

  async getUserById(userId: string) {
    await this.validateUserOwnershipService.validate(userId);

    const { email, name } = await this.usersRepository.findUniquetById({
      userId,
    });

    return { email, name };
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

    const { name, email } = await this.usersRepository.update({
      data: {
        id: userId,
        name: updateUserDto.name,
        email: updateUserDto.email,
        password: updateUserDto.newPassword ? hashedNewPassword : user.password,
      },
    });

    return { name, email };
  }

  async remove(userId: string) {
    await this.validateUserOwnershipService.validate(userId);

    await this.usersRepository.delete({ userId });

    return null;
  }
}
