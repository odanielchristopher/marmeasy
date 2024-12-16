import { User } from '@prisma/client';
import { compare, hash } from 'bcryptjs';
import { EmailAlreadyExists } from '../../../shared/errors/EmailAlreadyExists';
import { InvalidCredentials } from '../../../shared/errors/InvalidCredentials';
import { UserNotFound } from '../../../shared/errors/UserNotFound';
import { UsersRepository } from '../UsersRepository';


interface IInput {
  userId: string
  name: string;
  email: string;
  currentPassword: string;
  newPassword?: string;
};

interface IOutput {
  name: string;
  email: string;
};


export class EditUserUseCase {
  constructor(private readonly usersRepository: UsersRepository, private readonly salt: number) {}

  async execute({ userId, currentPassword, email, name, newPassword }: IInput): Promise<IOutput> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UserNotFound();
    }

    const isPasswordValid = await compare(currentPassword, user.password);

    if (!isPasswordValid) {
      throw new InvalidCredentials();
    }

    if (user.email !== email) {
      const userWithEmailAlreadyExists = await this.usersRepository.findByEmail(email);

      if (userWithEmailAlreadyExists) {
        throw new EmailAlreadyExists();
      }
    }

    let hashedNewPassword = '';
    if (newPassword) {
      hashedNewPassword = await hash(newPassword, this.salt);
    }

    const newUser: User = {
      id: userId,
      email,
      name,
      password: newPassword ? hashedNewPassword : user.password,
    };

    const updatedUser = await this.usersRepository.update(newUser);

    return updatedUser;
  }
}
