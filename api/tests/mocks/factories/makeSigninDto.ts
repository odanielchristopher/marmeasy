import { SigninDto } from 'src/modules/auth/dto/signin.dto';

export function makeSigninDto(data: Partial<SigninDto> = {}) {
  return {
    email: 'dani@mail.com',
    password: '123daniel',
    ...data,
  } as SigninDto;
}
