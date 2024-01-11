import { useQuery } from 'react-query';

import { fetchActivities } from '../../../api/activities/get';
import { ActivityStatus } from '../../../entities/ActivityStatus';

export function useFetchPendingActivities(projectId?: string) {
  const { data, isFetching } = useQuery({
    queryKey: ['pending-activities'],
    queryFn: () =>
      fetchActivities({
        status: ActivityStatus.PENDING,
        projectId: projectId ?? '',
      }),
  });

  return { pendingActivities: data, isFetching };
}
