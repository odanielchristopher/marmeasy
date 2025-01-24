import { SigninDto } from '../dto/signin.dto';
import { SignupDto } from '../dto/signup.dto';

export type AccessResponse = { accessToken: string };

export interface IAuthService {
  signin(signinDto: SigninDto): Promise<AccessResponse>;
  signup(signupDto: SignupDto): Promise<AccessResponse>;
}
