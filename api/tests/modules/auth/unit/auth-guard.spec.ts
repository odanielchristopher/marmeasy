import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { JwtServiceMock } from 'tests/mocks/services/jwt-service.mock';
import { contextMock } from 'tests/mocks/utils/context.mock';
import { ReflectorMock } from 'tests/mocks/utils/reflector.mock';

jest.mock('src/shared/config/env', () => ({
  env: {
    jwtSecret: 'mock-secret',
  },
}));

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    guard = new AuthGuard(
      JwtServiceMock as JwtService,
      ReflectorMock as Reflector,
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should allow access to public route', async () => {
    ReflectorMock.getAllAndOverride = jest.fn().mockReturnValue(true);

    const context = contextMock() as ExecutionContext;
    const result = await guard.canActivate(context);

    expect(result).toBe(true);
    expect(ReflectorMock.getAllAndOverride).toHaveBeenCalled();
  });

  it('should deny access without token', async () => {
    ReflectorMock.getAllAndOverride = jest.fn().mockReturnValue(false);

    const context = contextMock() as ExecutionContext;

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should deny access with invalid token', async () => {
    ReflectorMock.getAllAndOverride = jest.fn().mockReturnValue(false);
    const req = {
      headers: {
        authorization: 'Bearer valid.token',
      },
    };

    const context = {
      ...contextMock(),
      switchToHttp: () => ({
        getRequest: () => req,
      }),
    } as ExecutionContext;

    JwtServiceMock.verifyAsync = jest
      .fn()
      .mockRejectedValue(new Error('invalid token'));

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should allow access with valid token and attach userId to request', async () => {
    ReflectorMock.getAllAndOverride = jest.fn().mockReturnValue(false);

    const req = {
      headers: {
        authorization: 'Bearer valid.token',
      },
    };

    const context = {
      ...contextMock(),
      switchToHttp: () => ({
        getRequest: () => req,
      }),
    } as ExecutionContext;

    JwtServiceMock.verifyAsync = jest
      .fn()
      .mockResolvedValue({ sub: 'user-id-123' });

    const result = await guard.canActivate(context);

    expect(result).toBe(true);
    expect(req['userId']).toBe('user-id-123');
  });
});
