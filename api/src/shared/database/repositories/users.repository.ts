import { Injectable } from '@nestjs/common';
import {
  CreateUserParams,
  DataUserInput,
  DeleteUserParams,
  findFirstUserParams,
  findUniqueUserParams,
  IUsersRepository,
  SelectUserInput,
  UpdateUserParams,
  WhereUserInput,
} from '../interfaces/users.repository.interface';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findUnique(findUniqueDto: findUniqueUserParams) {
    const { where, select } = findUniqueDto;

    return this.prismaService.user.findUnique({
      where: this.parseWhereInput(where),
      select: this.parseSelectInput(select),
    });
  }

  findFirst(findFirstDto: findFirstUserParams) {
    const { where, select } = findFirstDto;

    return this.prismaService.user.findFirst({
      where: this.parseWhereInput(where),
      select: this.parseSelectInput(select),
    });
  }

  create(createDto: CreateUserParams) {
    const { data, select } = createDto;

    return this.prismaService.user.create({
      data: this.parseDataInput(data),
      select: this.parseSelectInput(select),
    });
  }

  update(updateDto: UpdateUserParams) {
    const { data, where, select } = updateDto;

    return this.prismaService.user.update({
      where: this.parseWhereInput(where),
      data: this.parseDataInput(data),
      select: this.parseSelectInput(select),
    });
  }

  delete(deleteDto: DeleteUserParams) {
    const { where, select } = deleteDto;

    return this.prismaService.user.delete({
      where: this.parseWhereInput(where),
      select: this.parseSelectInput(select),
    });
  }

  private parseSelectInput(select: SelectUserInput) {
    return {
      id: select.id,
      name: select.name,
      email: select.email,
      password: select.password,
    };
  }

  private parseWhereInput(where: WhereUserInput) {
    return {
      id: where.id,
      email: where.email,
      name: where.name,
      password: where.password,
    };
  }

  private parseDataInput(data: DataUserInput) {
    return {
      name: data.name,
      email: data.email,
      password: data.password,
      productCategories: {
        createMany: {
          data: data.productCategories,
        },
      },
    };
  }
}
