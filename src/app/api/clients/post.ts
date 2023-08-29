import { Client } from "../../entities/Client";
import { httpClient } from "../../services/httpClient";

export interface FetchCreateClientPayload {
  body: Omit<Client, "createdAt">;
}

export async function fetchCreateClient({ body }: FetchCreateClientPayload) {
  const { data } = await httpClient.post("/clients", body);

  return data;
}
