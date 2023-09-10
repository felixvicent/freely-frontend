import { Client } from "../../entities/Client";
import { Page } from "../../entities/Page";
import { Project } from "../../entities/Project";
import { httpClient } from "../../services/httpClient";

export interface ProjectParams {
  page?: number;
  size?: number;
  sort?: string;
}
interface FetchListProjectsPayload {
  params: ProjectParams;
}

export async function fetchListProjects({ params }: FetchListProjectsPayload) {
  const { data } = await httpClient.get<Page<Project>>("/projects", {
    params,
  });

  return data;
}
