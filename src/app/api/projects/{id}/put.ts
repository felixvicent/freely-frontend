import { Project } from "../../../entities/Project";
import { httpClient } from "../../../services/httpClient";
import { ProjectForm } from "../../dtos/ProjectForm";

export interface FetchUpdateProjectPayload {
  body: ProjectForm;
  path: {
    id: string;
  };
}

export async function fetchUpdateProject({
  body,
  path,
}: FetchUpdateProjectPayload) {
  const { data } = await httpClient.put<Project>(`/projects/${path.id}`, body);

  return data;
}
