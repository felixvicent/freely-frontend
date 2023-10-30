import { Token } from '../../../entities/Token';
import { User } from '../../../entities/User';
import { httpClient } from '../../../services/httpClient';

export interface FetchActiveAccountBody {
  password: string;
  code: string;
}

export interface FetchActiveAccountResponse {
  token: Token;
  user: User;
}

export async function fetchActiveAccount(body: FetchActiveAccountBody) {
  const { data } = await httpClient.post<FetchActiveAccountResponse>(
    '/auth/active-account',
    body,
  );

  return data;
}
