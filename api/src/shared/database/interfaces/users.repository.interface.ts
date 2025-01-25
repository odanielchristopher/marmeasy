import { User } from 'src/modules/users/entities/user.entity';

export interface IUsersRepository {
  findUnique(findUniqueDto: findUniqueUserParams): Promise<User | null>;

  findFirst(findFirstDto: findFirstUserParams): Promise<User | null>;

  create(createDto: CreateUserParams): Promise<User | null>;

  update(updateDto: UpdateUserParams): Promise<User | null>;

  delete(deleteDto: DeleteUserParams): Promise<User | null>;
}

export type findUniqueUserParams = {
  select?: SelectUserInput;
  where: WhereUserInput;
};

export type findFirstUserParams = {
  select?: SelectUserInput;
  where: WhereUserInput;
};

export type CreateUserParams = {
  data: DataUserInput;
  select?: SelectUserInput;
};

export type UpdateUserParams = {
  select?: SelectUserInput;
  where: WhereUserInput;
  data: DataUserInput;
};

export type DeleteUserParams = {
  select?: SelectUserInput;
  where: WhereUserInput;
};

export type WhereUserInput = {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
} | null;

export type SelectUserInput = {
  id?: boolean;
  name?: boolean;
  email?: boolean;
  password?: boolean;
} | null;

export type DataUserInput = {
  name: string;
  email: string;
  password: string;
  productCategories?: { icon: string; name: string }[];
};
