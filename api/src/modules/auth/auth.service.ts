import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

import { compare, hash } from 'bcryptjs';
import { IUsersRepository } from 'src/shared/database/interfaces/users-repository.interface';
import { IAuthService } from './interfaces/auth-service.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(IUsersRepository)
    private readonly userRespository: IUsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const user = await this.userRespository.findUniqueByEmail({ email });

    if (!user) {
      throw new UnauthorizedException('Usuário não cadastrado.');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha inválida.');
    }

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  async signup(signupDto: SignupDto) {
    const { name, email, password } = signupDto;

    const emailTaken = await this.userRespository.findUniqueByEmail({ email });

    if (emailTaken) {
      throw new ConflictException('Esse e-mail já está em uso.');
    }

    const hashedPassword = await hash(password, 10);

    const user = await this.userRespository.create({
      data: { name, email, password: hashedPassword },
      relations: {
        productCategories: [
          { icon: '🍝', name: 'marmitas' },
          { icon: '🍹', name: 'bebidas' },
          { icon: '🍟', name: 'lanches' },
        ],
      },
    });

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  private generateAccessToken(userId: string) {
    return this.jwtService.signAsync({ sub: userId });
  }
}
