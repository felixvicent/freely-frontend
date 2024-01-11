import { User } from '../../../entities/User';
import { apiException, httpClient } from '../../../services/httpClient';

export async function fetchListAllCollaborators() {
  try {
    const { data } = await httpClient.get<User[]>('/collaborators/all');

    return data;
  } catch (error) {
    throw apiException(error);
  }
}
