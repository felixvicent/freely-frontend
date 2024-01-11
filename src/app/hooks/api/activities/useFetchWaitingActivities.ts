import { useQuery } from 'react-query';

import { fetchActivities } from '../../../api/activities/get';
import { ActivityStatus } from '../../../entities/ActivityStatus';

export function useFetchWaitingActivities(
  projectId?: string,
  collaboratorsIds?: string[],
) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['waiting-activities'],
    queryFn: () =>
      fetchActivities({
        status: ActivityStatus.WAITING,
        projectId: projectId ?? '',
        collaboratorsIds,
      }),
  });

  return { waitingActivities: data, isFetching, refetch };
}
