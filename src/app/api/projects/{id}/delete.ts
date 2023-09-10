import { httpClient } from "../../../services/httpClient";

export interface FetchDeleteProjectPayload {
  path: {
    id: string;
  };
}

export async function fetchDeleteProject({ path }: FetchDeleteProjectPayload) {
  await httpClient.delete<void>(`/projects/${path.id}`);
}
