import { ClientList } from "../../../entities/ClientList";
import { httpClient } from "../../../services/httpClient";

export interface ClientParams {
  query?: string;
  selectedClientId?: string;
}
interface FetchSuggestionClientsPayload {
  params: ClientParams;
}

export async function fetchSuggestionClients({
  params,
}: FetchSuggestionClientsPayload) {
  const { data } = await httpClient.get<ClientList[]>("/clients/suggestion", {
    params,
  });

  return data;
}
