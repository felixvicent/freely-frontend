import { useQuery } from 'react-query';

import { fetchActivityDetails } from '../../../api/activities/{id}/get';

export function useFetchActivityDetails(activityId: string) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['activity-details', activityId],
    queryFn: () => fetchActivityDetails({ activityId }),
  });

  return { activity: data, isFetching, refetch };
}
