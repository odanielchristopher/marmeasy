import { IAccount } from '../interfaces/IAccount';
import { accounts } from '../mocks/accounts';

export class AccountRepository {
  findAccountByEmail(email: string) {
    const account = accounts.find((account) => (
      account.email === email
    ));
    return account;
  }

  createAccount({ email, password }: IAccount){
    accounts.push({ id: 'asdanwdasdawodnas-dkwadlisaudnwkd-jnalwidjasundkw', email, password });
    console.log({ email, password });
  }
}
