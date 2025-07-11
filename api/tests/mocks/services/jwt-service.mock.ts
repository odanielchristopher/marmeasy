import { JwtService } from '@nestjs/jwt';

export const JwtServiceMock: Partial<JwtService> = {
  signAsync: jest.fn(),
  verify: jest.fn(),
  verifyAsync: jest.fn(),
  decode: jest.fn(),
  sign: jest.fn(),
};
