import { User } from '../../entities/User';
import { httpClient } from '../../services/httpClient';

export interface FetchCreateUserPayload {
  body: {
    name: string;
    email: string;
    document: string;
    telephone: string;
  };
}

export async function fetchCreateUser({ body }: FetchCreateUserPayload) {
  const { data } = await httpClient.post<User>('/users', body);

  return data;
}
