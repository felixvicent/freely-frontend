import { useQuery } from 'react-query';

import {
  FetchDashboardActivitiesPayload,
  fetchDashboardActivities,
} from '../../../api/dashboard/activities/get';

export function useFetchDashboardAcitivities(
  params: FetchDashboardActivitiesPayload,
) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['dashboard', 'activities'],
    queryFn: () => fetchDashboardActivities(params),
  });

  return { activities: data, isFetching, refetch };
}
