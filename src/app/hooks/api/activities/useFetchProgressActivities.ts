import { useQuery } from 'react-query';

import { fetchActivities } from '../../../api/activities/get';
import { ActivityStatus } from '../../../entities/AcitivtyStatus';

export function useFetchProgressActivities(projectId?: string) {
  const { data, isFetching } = useQuery({
    queryKey: ['progress-activities'],
    queryFn: () =>
      fetchActivities({
        status: ActivityStatus.PROGRESS,
        projectId: projectId ?? '',
      }),
  });

  return { progressActivities: data, isFetching };
}
