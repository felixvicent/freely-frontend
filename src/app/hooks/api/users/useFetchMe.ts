import { useQuery } from 'react-query';

import { fetchMe } from '../../../api/users/me/get';

export function useFetchMe() {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['users-me'],
    queryFn: () => fetchMe(),
  });

  return { user: data, isFetching, refetch };
}
