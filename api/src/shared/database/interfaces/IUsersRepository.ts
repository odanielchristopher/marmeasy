import { User } from 'src/modules/users/entities/user.entity';

export interface IUsersRepository {
  findUniqueById(
    findUniqueByIdDto: FindUniqueUserByIdDto,
  ): Promise<User | null>;
  findFirstById(findFirstByIdDto: FindFirstUserByIdDto): Promise<User | null>;
  findFirstByEmail(
    findFirstByEmail: FindFirstUserByEmailDto,
  ): Promise<User | null>;
  create(createUserDto: CreateUserDto): Promise<User | null>;
  update(updateUserDto: UpdateUserDto): Promise<User | null>;
  delete(deleteUserDto: DeleteUserDto): void;
}

export type FindUniqueUserByIdDto = {
  id: string;
};

export type FindFirstUserByIdDto = {
  id: string;
};

export type FindFirstUserByEmailDto = {
  email: string;
};

export type CreateUserDto = {
  data: User;
};

export type UpdateUserDto = {
  data: User;
};

export type DeleteUserDto = {
  id: string;
};
