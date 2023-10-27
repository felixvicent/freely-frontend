import { Suggestion } from '../../../entities/Suggestion';
import { httpClient } from '../../../services/httpClient';

export interface UsersParams {
  query?: string;
}
interface FetchSuggestionUsersPayload {
  params: UsersParams;
}

export async function fetchSuggestionUsers({
  params,
}: FetchSuggestionUsersPayload) {
  const { data } = await httpClient.get<Suggestion[]>('/users/suggestion', {
    params,
  });

  return data;
}
