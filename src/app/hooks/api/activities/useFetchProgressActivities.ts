import { useQuery } from 'react-query';

import { fetchActivities } from '../../../api/activities/get';
import { ActivityStatus } from '../../../entities/ActivityStatus';

export function useFetchProgressActivities(
  projectId?: string,
  collaboratorsIds?: string[],
) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['progress-activities'],
    queryFn: () =>
      fetchActivities({
        status: ActivityStatus.PROGRESS,
        projectId: projectId ?? '',
        collaboratorsIds,
      }),
  });

  return { progressActivities: data, isFetching, refetch };
}
