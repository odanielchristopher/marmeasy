import { httpClient } from '../utils/httpClient';

interface FindMeResponse {
  name: string;
  email: string;
}


export async function findMe() {
  const { data } = await httpClient.get<FindMeResponse>('/users/find-me');

  return data;
}
