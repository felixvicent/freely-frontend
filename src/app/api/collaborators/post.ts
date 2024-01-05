import { User } from '../../entities/User';
import { httpClient } from '../../services/httpClient';

export interface FetchCreateCollaboratorPayload {
  body: {
    name: string;
    email: string;
    document: string;
    telephone: string;
    office: string;
  };
}

export async function fetchCreateCollaborator({
  body,
}: FetchCreateCollaboratorPayload) {
  const { data } = await httpClient.post<User>('/collaborators', body);

  return data;
}
