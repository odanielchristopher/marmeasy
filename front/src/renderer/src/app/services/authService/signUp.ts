import { httpClient } from '../utils/httpClient';

export interface SingUpParams {
  email: string
  password: string
}

interface SignUpResponse {
  accessToken: string;
}

export async function singUp(params: SingUpParams) {
  console.log('data');
  const { data } = await httpClient.post<SignUpResponse>('/users/sign-up', params);

  return data;
}
