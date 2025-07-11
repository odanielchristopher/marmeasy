import { IUsersRepository } from 'src/shared/database/interfaces/users-repository.interface';

export const UsersRepositoryMock: Partial<IUsersRepository> = {
  findUniqueByEmail: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  findUniquetById: jest.fn(),
  update: jest.fn(),
};
