import { User } from '../../../../entities/User';
import { httpClient } from '../../../../services/httpClient';

export interface FetchToggleUserActivePayload {
  path: {
    userId: string;
  };
}

export async function fetchToggleUserActive({
  path,
}: FetchToggleUserActivePayload) {
  const { data } = await httpClient.put<User>(
    `/users/${path.userId}/toggleActive`,
  );

  return data;
}
