import { sign } from 'jsonwebtoken';

import { env } from '@app/shared/config/env';

type IInput = {
  userId: string;
};

type IOutput = {
  accessToken: string;
};

export interface IGenerateAccessTokenUseCase {
  execute(input: IInput): IOutput;
}

class GenerateAccessTokenUseCase implements IGenerateAccessTokenUseCase {
  execute({ userId }: IInput) {
    const accessToken = sign({ sub: userId }, env.jwtSecret!, {
      expiresIn: '1d',
    });

    return { accessToken };
  }
}

export default new GenerateAccessTokenUseCase();
