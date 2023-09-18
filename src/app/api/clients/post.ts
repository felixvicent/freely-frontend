import { ClientList } from "../../entities/ClientList";
import { httpClient } from "../../services/httpClient";
import { ClientForm } from "../dtos/ClientForm";

export interface FetchCreateClientPayload {
  body: ClientForm;
}

export async function fetchCreateClient({ body }: FetchCreateClientPayload) {
  const { data } = await httpClient.post<ClientList>("/clients", body);

  return data;
}
