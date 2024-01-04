import { User } from '../../../entities/User';
import { apiException, httpClient } from '../../../services/httpClient';

export async function fetchMe() {
  try {
    const { data } = await httpClient.get<User>('/users/me');

    return data;
  } catch (error) {
    throw apiException(error);
  }
}
