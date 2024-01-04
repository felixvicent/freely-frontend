import { Page } from '../../entities/Page';
import { Project } from '../../entities/Project';
import { ProjectStatus } from '../../entities/ProjectStatus';
import { apiException, httpClient } from '../../services/httpClient';

export interface ProjectParams {
  page?: number;
  size?: number;
  sort?: string;
  clientIds: string[];
  status: ProjectStatus[];
}
interface FetchListProjectsPayload {
  params: ProjectParams;
}

export async function fetchListProjects({ params }: FetchListProjectsPayload) {
  try {
    const { data } = await httpClient.get<Page<Project>>('/projects', {
      params,
    });

    return data;
  } catch (error) {
    throw apiException(error);
  }
}
