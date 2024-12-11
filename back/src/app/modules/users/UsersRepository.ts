import { accounts } from '../../shared/mocks/accounts';
import { IUser } from './userEntity';

export class UsersRepository {
  findUserByEmail(email: string) {
    const account = accounts.find((account) => (
      account.email === email
    ));
    return account;
  }

  findUserById(userId: string) {
    const account = accounts.find((account) => (
      account.id === userId
    ));
    return account;
  }

  createUser({email, name, password }: IUser): IUser {
    const newUser = { id:'123456789', email, name, password };
    accounts.push(newUser);
    return newUser;
  }
}
