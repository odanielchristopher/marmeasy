import users from '@renderer/mocks/users';
import delay from '@renderer/utils/delay';

interface SingUpParams {
  email: string
  password: string
}

export async function singUp({ email, password }: SingUpParams) {
  await delay(2000);

  users.push({ email, password });
}
