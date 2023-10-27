import { useQuery } from 'react-query';

import { fetchSuggestionUsers } from '../../../api/users/suggestion/get';

export function useFetchSuggestionUsers(query: string) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['users-suggestion'],
    queryFn: () =>
      fetchSuggestionUsers({
        params: {
          query,
        },
      }),
  });

  return { usersSuggestion: data, isFetching, refetch };
}
