import { httpClient } from '../httpClient';

export interface FindMeResponse {
  name: string;
  email: string;
}

export async function findMe() {
  const { data } = await httpClient.get<FindMeResponse>('/users/me');

  return data;
}
