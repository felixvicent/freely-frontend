import { useQuery } from 'react-query';

import { fetchSuggestionCollaborators } from '../../../api/collaborators/suggestion/get';

export function useFetchSuggestionCollaborators(
  query: string,
  selectedCollaboratorId?: string,
) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['collaborators-suggestion'],
    queryFn: () =>
      fetchSuggestionCollaborators({
        params: {
          query,
          selectedCollaboratorId,
        },
      }),
  });

  return { collaborators: data, isFetching, refetch };
}
