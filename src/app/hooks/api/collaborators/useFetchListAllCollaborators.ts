import { useQuery } from 'react-query';

import { fetchListAllCollaborators } from '../../../api/collaborators/all/get';

export function useFetchListAllCollaborators() {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['collaborators-all'],
    queryFn: () => fetchListAllCollaborators(),
  });

  return { collaborators: data, isFetching, refetch };
}
