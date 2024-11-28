import user from '@renderer/mocks/user';
import delay from '@renderer/utils/delay';
import HttpClient from './utils/HttpClient';

class UserService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3000');
  }

  async getAuthorization({ email, password }) {
    await delay(2000);
    const isAuthorizated = (user.email === email) && (user.password === password);

    return isAuthorizated;
  }
}

export default new UserService();
