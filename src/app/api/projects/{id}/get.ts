import { Project } from '../../../entities/Project';
import { apiException, httpClient } from '../../../services/httpClient';

interface FetchProjectDetailsPayload {
  path: {
    projectId: string;
  };
}

export async function fetchProjectDetails({
  path,
}: FetchProjectDetailsPayload) {
  try {
    const { data } = await httpClient.get<Project>(
      `/projects/${path.projectId}`,
    );

    return data;
  } catch (error) {
    throw apiException(error);
  }
}
