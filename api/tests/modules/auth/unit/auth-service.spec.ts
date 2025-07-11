import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { AuthService } from 'src/modules/auth/auth.service';
import { SigninDto } from 'src/modules/auth/dto/signin.dto';
import { IUsersRepository } from 'src/shared/database/interfaces/users-repository.interface';
import { makeSigninDto } from 'tests/mocks/factories/makeSigninDto';
import { makeSignupDto } from 'tests/mocks/factories/makeSignupDto';
import { makeUser } from 'tests/mocks/factories/makeUser';

import { UsersRepositoryMock } from 'tests/mocks/repositories/users-repository.mock';
import { JwtServiceMock } from 'tests/mocks/services/jwt-service.mock';

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
  hash: jest.fn(() => 'hashed-password'),
}));

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    service = new AuthService(
      UsersRepositoryMock as IUsersRepository,
      JwtServiceMock as JwtService,
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return accessToken', async () => {
    (compare as jest.Mock).mockResolvedValue(true);
    const signInDto = makeSigninDto();
    const expectedResult = { accessToken: '1234-signed' };

    // Simula o que o usuário existe
    UsersRepositoryMock.findUniqueByEmail = jest.fn().mockResolvedValue({
      id: '1234',
      ...signInDto,
    });
    JwtServiceMock.signAsync = jest.fn().mockResolvedValue('1234-signed');
    (compare as jest.Mock).mockResolvedValue(true);

    const result = await service.signin(signInDto);

    expect(result).toEqual(expectedResult);
  });

  it('should throw UnauthorizedException if password is invalid', async () => {
    const signInDto = makeSigninDto({
      password: 'senhaerrada',
    });

    // Simula o que o usuário existe
    UsersRepositoryMock.findUniqueByEmail = jest.fn().mockResolvedValue(
      makeUser({
        password: 'outrasenha',
      }),
    );

    // Senha inválida
    (compare as jest.Mock).mockResolvedValue(false);

    await expect(service.signin(signInDto)).rejects.toThrow('Senha inválida.');
    expect(compare).toHaveBeenCalledWith('senhaerrada', 'outrasenha');
  });

  it('should throw UnauthorizedException if user does not exist', async () => {
    const signIdDto: SigninDto = {
      email: 'naoexiste@mail.com',
      password: '123',
    };

    // Simula usuário não encontrado.
    UsersRepositoryMock.findUniqueByEmail = jest.fn().mockResolvedValue(null);

    await expect(service.signin(signIdDto)).rejects.toThrow(
      'Usuário não cadastrado.',
    );
  });

  it('should sign up user and return accessToken', async () => {
    const signupDto = makeSignupDto({
      name: 'Novo Usuário',
      email: 'novo@mail.com',
      password: 'senha123',
    });

    // Simula que o e-mail está livre para uso
    UsersRepositoryMock.findUniqueByEmail = jest.fn().mockResolvedValue(null);
    UsersRepositoryMock.create = jest.fn().mockResolvedValue(
      makeUser({
        id: 'new-user-id',
        ...signupDto,
        password: 'hashed-password',
      }),
    );
    JwtServiceMock.signAsync = jest
      .fn()
      .mockResolvedValue('new-user-id-signed');

    const expectedResult = { accessToken: 'new-user-id-signed' };

    const result = await service.signup(signupDto);

    expect(result).toEqual(expectedResult);
    expect(hash).toHaveBeenCalledWith('senha123', 10);
    expect(UsersRepositoryMock.create).toHaveBeenCalledWith({
      data: {
        name: 'Novo Usuário',
        email: 'novo@mail.com',
        password: 'hashed-password',
      },
      relations: {
        productCategories: [
          { icon: '🍝', name: 'marmitas' },
          { icon: '🍹', name: 'bebidas' },
          { icon: '🍟', name: 'lanches' },
        ],
      },
    });
  });

  it('should throw ConflictException if email already exists', async () => {
    const signupDto = makeSignupDto({
      name: 'Daniel',
      email: 'dani@mail.com',
      password: 'qualquer',
    });

    // Simula que o e-mail já está em uso
    UsersRepositoryMock.findUniqueByEmail = jest.fn().mockResolvedValue(
      makeUser({
        id: '1234',
        ...signupDto,
      }),
    );

    await expect(service.signup(signupDto)).rejects.toThrow(
      'Esse e-mail já está em uso.',
    );
  });
});
