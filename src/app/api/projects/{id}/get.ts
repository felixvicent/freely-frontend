import { Project } from "../../../entities/Project";
import { httpClient } from "../../../services/httpClient";

interface FetchProjectDetailsPayload {
  path: {
    projectId: string;
  };
}

export async function fetchProjectDetails({
  path,
}: FetchProjectDetailsPayload) {
  const { data } = await httpClient.get<Project>(`/projects/${path.projectId}`);

  return data;
}
