import delay from '@renderer/app/utils/delay';
import { httpClient } from '../utils/httpClient';

export interface SingUpParams {
  email: string
  password: string
}

interface SignUpResponse {
  accessToken: string;
}

export async function singUp(params: SingUpParams) {
  await delay(2000);

  const { data } = await httpClient.post<SignUpResponse>('/user/sign-up', params);

  return data;
}
