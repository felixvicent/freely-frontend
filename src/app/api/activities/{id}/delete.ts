import { httpClient } from "../../../services/httpClient";

export interface FetchDeleteActivityPayload {
  path: {
    id: string;
  };
}

export async function fetchDeleteActivity({
  path,
}: FetchDeleteActivityPayload) {
  await httpClient.delete<void>(`/activities/${path.id}`);
}
