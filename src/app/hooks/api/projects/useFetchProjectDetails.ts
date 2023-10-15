import { useQuery } from 'react-query';

import { fetchProjectDetails } from '../../../api/projects/{id}/get';

export function useFetchProjectDetails(projectId: string) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['project-details'],
    queryFn: () => fetchProjectDetails({ path: { projectId } }),
  });

  return { project: data, isFetching, refetch };
}
