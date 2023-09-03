import { Client } from "../../entities/Client";
import { httpClient } from "../../services/httpClient";

export interface FetchCreateClientPayload {
  body: Omit<Client, "createdAt" | "id">;
}

export async function fetchCreateClient({ body }: FetchCreateClientPayload) {
  const { data } = await httpClient.post<Client>("/clients", body);

  return data;
}
