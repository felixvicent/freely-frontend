import { useQuery } from 'react-query';

import { UserParams, fetchListUsers } from '../../../api/users/get';

export function useFetchListUsers(userParams: UserParams) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchListUsers({ params: userParams }),
  });

  return { users: data, isFetching, refetch };
}
