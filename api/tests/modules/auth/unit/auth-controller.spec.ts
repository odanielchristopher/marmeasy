import { AuthController } from 'src/modules/auth/auth.controller';
import { SigninDto } from 'src/modules/auth/dto/signin.dto';
import { SignupDto } from 'src/modules/auth/dto/signup.dto';
import { IAuthService } from 'src/modules/auth/interfaces/auth-service.interface';
import { AuthServiceMock } from 'tests/mocks/services/auth-service.mock';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    controller = new AuthController(AuthServiceMock as IAuthService);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call authService.signin with correct data', async () => {
    const dto: SigninDto = { email: 'user@mail.com', password: '123456' };
    AuthServiceMock.signin = jest.fn().mockResolvedValue({
      accessToken: 'token123',
    });

    const result = await controller.signin(dto);

    expect(AuthServiceMock.signin).toHaveBeenCalledWith(dto);
    expect(result).toEqual({ accessToken: 'token123' });
  });

  it('should call authService.signup with correct data', async () => {
    const dto: SignupDto = {
      name: 'Daniel',
      email: 'user@mail.com',
      password: '123456',
    };
    AuthServiceMock.signup = jest.fn().mockResolvedValue({
      accessToken: 'token456',
    });

    const result = await controller.signup(dto);

    expect(AuthServiceMock.signup).toHaveBeenCalledWith(dto);
    expect(result).toEqual({ accessToken: 'token456' });
  });
});
