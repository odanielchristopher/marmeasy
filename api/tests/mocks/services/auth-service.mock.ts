import { IAuthService } from 'src/modules/auth/interfaces/auth-service.interface';

export const AuthServiceMock: Partial<IAuthService> = {
  signin: jest.fn(),
  signup: jest.fn(),
};
