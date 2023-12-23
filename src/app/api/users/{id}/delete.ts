import { User } from '../../../entities/User';
import { httpClient } from '../../../services/httpClient';

export interface FetchDeleteUserPayload {
  path: {
    id: string;
  };
}

export async function fetchDeleteUser({ path }: FetchDeleteUserPayload) {
  const { data } = await httpClient.delete<User>(`/users/${path.id}`);

  return data;
}
