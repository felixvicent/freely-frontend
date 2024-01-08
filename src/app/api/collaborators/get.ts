import { Page } from '../../entities/Page';
import { User } from '../../entities/User';
import { apiException, httpClient } from '../../services/httpClient';

export interface CollaboratorParams {
  page?: number;
  size?: number;
  sort?: string;
  collaboratorIds: string[];
}
interface FetchListCollaboratorPayload {
  params: CollaboratorParams;
}

export async function fetchListCollaborators({
  params,
}: FetchListCollaboratorPayload) {
  try {
    const { data } = await httpClient.get<Page<User>>('/collaborators', {
      params,
    });

    return data;
  } catch (error) {
    throw apiException(error);
  }
}
