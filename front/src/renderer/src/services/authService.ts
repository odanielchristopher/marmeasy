import users from '@renderer/mocks/users';
import delay from '@renderer/utils/delay';

import { httpClient } from './utils/httpClient';

// class UserService {

//   async getAuthorization({ email, password }) {
//     await delay(2000);
//     await httpClient.post('/auth/signin', {email, password});
//     const userExists = users.find((userObj) => (
//       userObj.email === email && userObj.password === password
//     ));

//     if (!userExists) {
//       throw new Error();
//     }


//     return true;
//   }

//   async registerNewUser({ email, password }) {
//     await delay(2000);

//     users.push({ email, password });
//   }
// }

// export default new UserService();

interface SingInParams {
  email: string
  password: string
}

async function signIn({ email, password }: SingInParams) {
  await delay(2000);
  const { data } = await httpClient.post('/auth/signin', {email, password});

  return data;
}

interface SingUpParams {
  email: string
  password: string
}

async function singUp({ email, password }: SingUpParams) {
  await delay(2000);

  users.push({ email, password });
}

export const authService = {
  signIn,
  singUp
};
