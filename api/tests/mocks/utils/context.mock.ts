import { ExecutionContext } from '@nestjs/common';

export const contextMock = (): Partial<ExecutionContext> => {
  return {
    getClass: jest.fn(),
    getHandler: jest.fn(),
    switchToHttp: () => ({
      getRequest<T = any>() {
        return {
          headers: {
            authorization: undefined,
          },
        } as T;
      },
      getNext<T = any>() {
        return {} as T;
      },
      getResponse<T = any>() {
        return {} as T;
      },
    }),
  };
};
