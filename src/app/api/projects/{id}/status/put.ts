import { Project } from '../../../../entities/Project';
import { ProjectStatus } from '../../../../entities/ProjectStatus';
import { httpClient } from '../../../../services/httpClient';

export interface FetchUpdateProjectStatusPayload {
  body: {
    status: ProjectStatus;
  };
  path: {
    id: string;
  };
}

export async function fetchUpdateProjectStatus({
  body,
  path,
}: FetchUpdateProjectStatusPayload) {
  const { data } = await httpClient.put<Project>(
    `/projects/${path.id}/status`,
    {
      status: body.status,
    },
  );

  return data;
}
