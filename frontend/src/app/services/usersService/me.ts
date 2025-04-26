import { IUser } from '@app/entities/User';

import { httpClient } from '../httpClient';

type MeResponse = IUser;

export async function me() {
  const { data } = await httpClient.get<MeResponse>('/me');

  return data;
}
