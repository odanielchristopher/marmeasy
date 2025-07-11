import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { compare, hash } from 'bcryptjs';
import { AuthService } from 'src/modules/auth/auth.service';
import { SigninDto } from 'src/modules/auth/dto/signin.dto';
import { SignupDto } from 'src/modules/auth/dto/signup.dto';
import { IUsersRepository } from 'src/shared/database/interfaces/users-repository.interface';

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
  hash: jest.fn(() => 'hashed-password'),
}));

describe('AuthService', () => {
  let service: AuthService;
  const UsersRepositoryMock: Partial<IUsersRepository> = {};
  const JwtServiceMock: Partial<JwtService> = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: JwtServiceMock },
        { provide: IUsersRepository, useValue: UsersRepositoryMock },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return accessToken', async () => {
    (compare as jest.Mock).mockResolvedValue(true);
    const signInDto: SigninDto = {
      email: 'dani@mail.com',
      password: '123daniel',
    };
    const expectedResult = { accessToken: '1234-signed' };

    // Simula o que o usuário existe
    UsersRepositoryMock.findUniqueByEmail = jest.fn().mockResolvedValue({
      id: '1234',
      ...signInDto,
    });
    JwtServiceMock.signAsync = jest.fn().mockResolvedValue('1234-signed');

    const result = await service.signin(signInDto);

    expect(result).toEqual(expectedResult);
  });

  it('should throw UnauthorizedException if password is invalid', async () => {
    const signInDto: SigninDto = {
      email: 'dani@mail.com',
      password: 'senhaerrada',
    };

    // Simula o que o usuário existe
    UsersRepositoryMock.findUniqueByEmail = jest.fn().mockResolvedValue({
      id: '1234',
      ...signInDto,
    });

    // Senha inválida
    (compare as jest.Mock).mockResolvedValue(false);

    await expect(service.signin(signInDto)).rejects.toThrow('Senha inválida.');
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
    const signupDto: SignupDto = {
      name: 'Novo Usuário',
      email: 'novo@mail.com',
      password: 'senha123',
    };

    // Simula que o e-mail está livre para uso
    UsersRepositoryMock.findUniqueByEmail = jest.fn().mockResolvedValue(null);
    UsersRepositoryMock.create = jest.fn().mockResolvedValue({
      id: 'new-user-id',
      ...signupDto,
      password: 'hashed-password',
    });
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
    const signupDto: SignupDto = {
      name: 'Daniel',
      email: 'dani@mail.com',
      password: 'qualquer',
    };

    // Simula que o e-mail já está em uso
    UsersRepositoryMock.findUniqueByEmail = jest.fn().mockResolvedValue({
      id: '1234',
      ...signupDto,
    });

    await expect(service.signup(signupDto)).rejects.toThrow(
      'Esse e-mail já está em uso.',
    );
  });
});
