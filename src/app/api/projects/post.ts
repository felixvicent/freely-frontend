import { Project } from "../../entities/Project";
import { httpClient } from "../../services/httpClient";
import { ProjectForm } from "../dtos/ProjectForm";

export interface FetchCreateProjectPayload {
  body: ProjectForm;
}

export async function fetchCreateProject({ body }: FetchCreateProjectPayload) {
  const { data } = await httpClient.post<Project>("/projects", body);

  return data;
}
