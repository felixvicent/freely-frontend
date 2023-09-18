import { ClientList } from "../../../entities/ClientList";
import { httpClient } from "../../../services/httpClient";
import { ClientForm } from "../../dtos/ClientForm";

export interface FetchCreateClientPayload {
  body: ClientForm;
  path: {
    id: string;
  };
}

export async function fetchUpdateClient({
  body,
  path,
}: FetchCreateClientPayload) {
  const { data } = await httpClient.put<ClientList>(
    `/clients/${path.id}`,
    body
  );

  return data;
}
