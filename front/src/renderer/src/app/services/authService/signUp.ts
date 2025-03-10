import { httpClient } from '../httpClient';

export interface SingUpParams {
  email: string;
  password: string;
}

export interface SignUpResponse {
  accessToken: string;
}

export async function singUp(params: SingUpParams) {
  const { data } = await httpClient.post<SignUpResponse>(
    '/auth/signup',
    params,
  );

  return data;
}
