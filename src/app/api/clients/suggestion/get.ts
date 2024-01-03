import { Suggestion } from '../../../entities/Suggestion';
import { httpClient } from '../../../services/httpClient';

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
  const { data } = await httpClient.get<Suggestion[]>('/clients/suggestion', {
    params,
  });

  return data;
}
