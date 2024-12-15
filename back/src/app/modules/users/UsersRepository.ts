import { User } from '@prisma/client';
import { prismaClient } from '../../../database';
import { IUser } from './userEntity';

export class UsersRepository {
  async findByEmail(email: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findById(id: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async create({email, name, password }: IUser) {
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password,
      },
      select: {
        name: true,
        email: true,
      },
    });

    return user;
  }

  async update(user: User) {
    const updatedUser = await prismaClient.user.update({
      data: {
        ...user,
      },
      where: {
        id: user.id,
      },
      select: {
        name: true,
        email: true,
      },
    });

    return updatedUser;
  }

  async delete(id: string) {
    await prismaClient.user.delete({
      where: {
        id,
      },
    });
  }
}
