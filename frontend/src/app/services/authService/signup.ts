import { httpClient } from '../httpClient';

export interface ISignupParams {
  name: string;
  email: string;
  password: string;
}

interface ISignupResponse {
  accessToken: string;
}

export async function signup(params: ISignupParams) {
  const { data } = await httpClient.post<ISignupResponse>(
    '/auth/signup',
    params,
  );

  return data;
}
