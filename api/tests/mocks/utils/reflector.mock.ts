import { Reflector } from '@nestjs/core';

export const ReflectorMock: Partial<Reflector> = {
  get: jest.fn(),
  getAll: jest.fn(),
  getAllAndMerge: jest.fn(),
  getAllAndOverride: jest.fn(),
};
