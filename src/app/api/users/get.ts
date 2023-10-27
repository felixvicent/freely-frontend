import { Page } from '../../entities/Page';
import { User } from '../../entities/User';
import { apiException, httpClient } from '../../services/httpClient';

export interface UserParams {
  page?: number;
  size?: number;
  sort?: string;
  usersIds?: string[];
}
interface FetchListUsersPayload {
  params: UserParams;
}

export async function fetchListUsers({ params }: FetchListUsersPayload) {
  try {
    const { data } = await httpClient.get<Page<User>>('/users', {
      params,
    });

    return data;
  } catch (error) {
    throw apiException(error);
  }
}
