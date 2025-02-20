import { httpClient } from '../httpClient';

export async function deleteMe() {
  await httpClient.delete('/users/delete-me');
}
