import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/users/entities/user.entity';
import {
  CreateUserDto,
  DeleteUserDto,
  FindUniqueUserByEmailDto,
  FindUniqueUserByIdDto,
  IUsersRepository,
  UpdateUserDto,
} from '../interfaces/IUsersRepository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findUniquetById(
    findUniqueByIdDto: FindUniqueUserByIdDto,
  ): Promise<User | null> {
    const { userId } = findUniqueByIdDto;

    const findedUser = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    return findedUser;
  }

  async findUniqueByEmail(
    findUniqueByEmail: FindUniqueUserByEmailDto,
  ): Promise<User | null> {
    const { email } = findUniqueByEmail;

    const findedUser = await this.prismaService.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    return findedUser;
  }

  async create(createUserDto: CreateUserDto): Promise<User | null> {
    const {
      data,
      relations: { productCategories },
    } = createUserDto;

    const newUser = await this.prismaService.user.create({
      data: {
        ...data,
        productCategories: {
          createMany: {
            data: productCategories,
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    return newUser;
  }

  async update(updateUserDto: UpdateUserDto): Promise<User | null> {
    const { data, userId } = updateUserDto;

    const updatedUser = await this.prismaService.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    return updatedUser;
  }

  async delete(deleteUserDto: DeleteUserDto): Promise<void> {
    const { userId } = deleteUserDto;

    await this.prismaService.user.delete({
      where: { id: userId },
    });
  }
}
