import { httpClient } from '../utils/httpClient';

interface SingInParams {
  email: string
  password: string
}

interface SignUpResponse {
  accessToken: string;
}

export async function signIn(params: SingInParams) {
  const { data } = await httpClient.post<SignUpResponse>('/users/sign-in', params);

  return data;
}
