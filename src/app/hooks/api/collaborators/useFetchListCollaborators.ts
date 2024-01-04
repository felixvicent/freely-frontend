import { useQuery } from 'react-query';

import {
  CollaboratorParams,
  fetchListCollaborators,
} from '../../../api/collaborators/get';

export function useFetchListCollaborators(
  collaboratorsParams: CollaboratorParams,
) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['collaborators'],
    queryFn: () => fetchListCollaborators({ params: collaboratorsParams }),
  });

  return { collaborators: data, isFetching, refetch };
}
