import { httpClient } from "../../../services/httpClient";

export interface FetchCDeletelientPayload {
  path: {
    id: string;
  };
}

export async function fetchDeleteClient({ path }: FetchCDeletelientPayload) {
  await httpClient.delete<void>(`/clients/${path.id}`);
}
