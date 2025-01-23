import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/users/entities/user.entity';
import {
  CreateUserDto,
  DeleteUserDto,
  FindFirstUserByEmailDto,
  FindFirstUserByIdDto,
  FindUniqueUserByIdDto,
  IUsersRepository,
  UpdateUserDto,
} from '../interfaces/IUsersRepository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findUniqueById(findUniqueByIdDto: FindUniqueUserByIdDto): User {
    const { id } = findUniqueByIdDto;

    return this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });
  }
  findFirstById(findFirstByIdDto: FindFirstUserByIdDto): User {
    throw new Error('Method not implemented.');
  }
  findFirstByEmail(findFirstByEmail: FindFirstUserByEmailDto): User {
    throw new Error('Method not implemented.');
  }
  create(createUserDto: CreateUserDto): User {
    throw new Error('Method not implemented.');
  }
  update(updateUserDto: UpdateUserDto): User {
    throw new Error('Method not implemented.');
  }
  delete(deleteUserDto: DeleteUserDto): void {
    throw new Error('Method not implemented.');
  }

  // findUnique(findUniqueDto: Prisma.UserFindUniqueArgs) {
  //   return this.prismaService.user.findUnique(findUniqueDto);
  // }

  // findFirst(findFirstDto: Prisma.UserFindFirstArgs) {
  //   return this.prismaService.user.findFirst(findFirstDto);
  // }

  // create(createDto: Prisma.UserCreateArgs) {
  //   return this.prismaService.user.create(createDto);
  // }

  // update(updateDto: Prisma.UserUpdateArgs) {
  //   return this.prismaService.user.update(updateDto);
  // }

  // delete(deleteDto: Prisma.UserDeleteArgs) {
  //   return this.prismaService.user.delete(deleteDto);
  // }
}
