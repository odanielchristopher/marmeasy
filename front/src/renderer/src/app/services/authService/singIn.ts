import { httpClient } from '../httpClient';

export interface SingInParams {
  email: string
  password: string
}

export interface SignInResponse {
  accessToken: string;
}

export async function signIn(params: SingInParams) {
  const { data } = await httpClient.post<SignInResponse>('/users/sign-in', params);

  return data;
}
