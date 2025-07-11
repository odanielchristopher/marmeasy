import { SignupDto } from 'src/modules/auth/dto/signup.dto';

export function makeSignupDto(data: Partial<SignupDto> = {}) {
  return {
    name: 'daniel',
    email: 'dani@mail.com',
    password: '123daniel',
    ...data,
  } as SignupDto;
}
