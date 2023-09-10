import { httpClient } from "../../../services/httpClient";

export interface FetchDeleteClientPayload {
  path: {
    id: string;
  };
}

export async function fetchDeleteClient({ path }: FetchDeleteClientPayload) {
  await httpClient.delete<void>(`/clients/${path.id}`);
}
