import { User } from '../../../entities/User';
import { httpClient } from '../../../services/httpClient';

export interface FetchDeleteCollaboratorPayload {
  path: {
    id: string;
  };
}

export async function fetchDeleteCollaborator({
  path,
}: FetchDeleteCollaboratorPayload) {
  const { data } = await httpClient.delete<User>(`/collaborators/${path.id}`);

  return data;
}
