import { prismaClient } from '@app/shared/lib/prismaClient';

export class UsersRepository {
  findByEmail(email: string) {
    return prismaClient.user.findUnique({
      where: { email },
      select: { id: true, name: true, email: true },
    });
  }

  findById(id: string) {
    return prismaClient.user.findUnique({
      where: { id },
      select: { name: true, email: true },
    });
  }

  create(user: { name: string; email: string; password: string }) {
    return prismaClient.user.create({
      data: user,
    });
  }
}
