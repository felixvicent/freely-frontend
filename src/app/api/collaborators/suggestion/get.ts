import { Suggestion } from '../../../entities/Suggestion';
import { httpClient } from '../../../services/httpClient';

export interface CollaboratorParams {
  query?: string;
  selectedCollaboratorId?: string;
}
interface FetchSuggestionCollaboratorsPayload {
  params: CollaboratorParams;
}

export async function fetchSuggestionCollaborators({
  params,
}: FetchSuggestionCollaboratorsPayload) {
  const { data } = await httpClient.get<Suggestion[]>(
    '/collaborators/suggestion',
    {
      params,
    },
  );

  return data;
}
