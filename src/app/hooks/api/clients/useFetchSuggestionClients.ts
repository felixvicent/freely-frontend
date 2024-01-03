import { useQuery } from 'react-query';

import { fetchSuggestionClients } from '../../../api/clients/suggestion/get';

export function useFetchSuggestionClients(
  query: string,
  selectedClientId?: string,
) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['clients-suggestion'],
    queryFn: () =>
      fetchSuggestionClients({
        params: {
          query,
          selectedClientId,
        },
      }),
  });

  return { clients: data, isFetching, refetch };
}
