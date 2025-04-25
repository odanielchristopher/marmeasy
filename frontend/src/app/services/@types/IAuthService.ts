export type SignInDto = {
  email: string;
  password: string;
};

export type SignUpDto = {
  name: string;
  email: string;
  password: string;
};

export interface IAuthService {
  signin(signInDto: SignInDto): Promise<{ accessToken: string }>;

  signup(signOutDto: SignUpDto): Promise<{ accessToken: string }>;
}
