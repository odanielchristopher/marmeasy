import { httpClient } from '../utils/httpClient';

export interface EditMeParams {
  name: string;
  email: string;
  currentPassword: string;
  newPassword?: string;
}

export interface EditMeResponse {
  name: string;
  email: string;
}

export async function editMe(params: EditMeParams) {
  const { data } = await httpClient.put<EditMeResponse>('/users/edit-me', params);

  return data;
}
