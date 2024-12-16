import { httpClient } from '../utils/httpClient';

export async function deleteMe() {
  await httpClient.delete('/users/delete-me');
}
