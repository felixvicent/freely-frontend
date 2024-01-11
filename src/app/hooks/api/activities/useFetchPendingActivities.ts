import { useQuery } from 'react-query';

import { fetchActivities } from '../../../api/activities/get';
import { ActivityStatus } from '../../../entities/ActivityStatus';

export function useFetchPendingActivities(
  projectId?: string,
  collaboratorsIds?: string[],
) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['pending-activities'],
    queryFn: () =>
      fetchActivities({
        status: ActivityStatus.PENDING,
        projectId: projectId ?? '',
        collaboratorsIds,
      }),
  });

  return { pendingActivities: data, isFetching, refetch };
}
