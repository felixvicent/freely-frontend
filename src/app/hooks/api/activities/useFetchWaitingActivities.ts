import { useQuery } from 'react-query';

import { fetchActivities } from '../../../api/activities/get';
import { ActivityStatus } from '../../../entities/AcitivtyStatus';

export function useFetchWaitingActivities(projectId?: string) {
  const { data, isFetching } = useQuery({
    queryKey: ['waiting-activities'],
    queryFn: () =>
      fetchActivities({
        status: ActivityStatus.WAITING,
        projectId: projectId ?? '',
      }),
  });

  return { waitingActivities: data, isFetching };
}
