import { User } from '../../../entities/User';
import { httpClient } from '../../../services/httpClient';

export interface FetchUpdateUserPayload {
  path: {
    id: string;
  };
  body: {
    name: string;
    email: string;
    document: string;
    telephone: string;
  };
}

export async function fetchUpdateUser({ body, path }: FetchUpdateUserPayload) {
  const { data } = await httpClient.put<User>(`/users/${path.id}`, body);

  return data;
}
