import { IAuthService } from '../@types/IAuthService';

import { signin } from './signin';
import { signup } from './signup';

export const authService: IAuthService = {
  signin,
  signup,
};
