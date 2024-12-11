import users from '@renderer/app/mocks/users';
import delay from '@renderer/app/utils/delay';

interface SingUpParams {
  email: string
  password: string
}

export async function singUp({ email, password }: SingUpParams) {
  await delay(2000);

  users.push({ email, password });
}
