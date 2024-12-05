import { singUp } from './signUp';
import { signIn } from './singIn';

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

export const authService = {
  signIn,
  singUp
};
