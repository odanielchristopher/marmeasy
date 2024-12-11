import { accounts } from '../../shared/mocks/accounts';
import { User } from './userEntity';

export class UsersRepository {
  findAccountByEmail(email: string) {
    const account = accounts.find((account) => (
      account.email === email
    ));
    return account;
  }

  createUser({ email, password }: User) {
    accounts.push({ id: 'asdanwdasdawodnas-dkwadlisaudnwkd-jnalwidjasundkw', email, password });
    console.log({ email, password });
  }
}
