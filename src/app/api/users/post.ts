import { User } from '../../entities/User';
import { httpClient } from '../../services/httpClient';

export interface FetchCreateUserBody {
  name: string;
  email: string;
  document: string;
}

export async function fetchCreateUser(body: FetchCreateUserBody) {
  const { data } = await httpClient.post<User>('/users', body);

  return data;
}
