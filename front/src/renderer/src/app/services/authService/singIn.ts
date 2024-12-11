import delay from '@renderer/app/utils/delay';
import { httpClient } from '../utils/httpClient';

interface SingInParams {
  email: string
  password: string
}

interface SignUpResponse {
  accessToken: string;
}

export async function signIn(params: SingInParams) {
  await delay(2000);

  const { data } = await httpClient.post<SignUpResponse>('/user/sign-in', params);

  return data;
}
