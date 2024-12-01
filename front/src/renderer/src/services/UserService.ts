import users from '@renderer/mocks/users';
import delay from '@renderer/utils/delay';
import HttpClient from './utils/HttpClient';

class UserService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3000');
  }

  async getAuthorization({ email, password }) {
    await delay(2000);
    const userExists = users.find((userObj) => (
      userObj.email === email && userObj.password === password
    ));

    if (!userExists) {
      return false;
    }

    return true;
  }

  async registerNewUser({ email, password }) {
    await delay(2000);

    users.push({ email, password });
  }
}

export default new UserService();
