import { Client } from "../../../entities/Client";
import { httpClient } from "../../../services/httpClient";

export interface FetchCreateClientPayload {
  body: Omit<Client, "createdAt" | "id">;
  path: {
    id: string;
  };
}

export async function fetchUpdateClient({
  body,
  path,
}: FetchCreateClientPayload) {
  const { data } = await httpClient.put<Client>(`/clients/${path.id}`, body);

  return data;
}
