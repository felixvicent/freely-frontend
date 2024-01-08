import { User } from '../../../entities/User';
import { httpClient } from '../../../services/httpClient';

export interface FetchUpdateCollaboratorPayload {
  path: {
    id: string;
  };
  body: {
    name: string;
    email: string;
    document: string;
    telephone: string;
    office: string;
  };
}

export async function fetchUpdateCollaborator({
  body,
  path,
}: FetchUpdateCollaboratorPayload) {
  const { data } = await httpClient.put<User>(
    `/collaborators/${path.id}`,
    body,
  );

  return data;
}
