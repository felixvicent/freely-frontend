import { useQuery } from 'react-query';

import {
  FetchDashboardProjectsPayload,
  fetchDashboardProjects,
} from '../../../api/dashboard/projects/get';

export function useFetchDashboardProjects(
  params: FetchDashboardProjectsPayload,
) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['dashboard', 'projects'],
    queryFn: () => fetchDashboardProjects(params),
  });

  return { projects: data, isFetching, refetch };
}
