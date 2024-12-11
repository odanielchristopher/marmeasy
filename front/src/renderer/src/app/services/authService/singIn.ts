import users from '@renderer/app/mocks/users';
import delay from '@renderer/app/utils/delay';

interface SingInParams {
  email: string
  password: string
}

export async function signIn({ email, password }: SingInParams) {
  await delay(2000);
  // const { data } = await httpClient.post<{ accessToken: string }>('/auth/signin', {email, password});

  const userExists = users.find((userObj) => (
    userObj.email === email && userObj.password === password
  ));

  if (!userExists) {
    throw new Error();
  }

  return true;
}
