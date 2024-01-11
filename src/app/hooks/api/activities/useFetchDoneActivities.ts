import { useQuery } from 'react-query';

import { fetchActivities } from '../../../api/activities/get';
import { ActivityStatus } from '../../../entities/ActivityStatus';

export function useFetchDoneActivities(projectId?: string) {
  const { data, isFetching } = useQuery({
    queryKey: ['done-activities'],
    queryFn: () =>
      fetchActivities({
        status: ActivityStatus.DONE,
        projectId: projectId ?? '',
      }),
  });

  return { doneActivities: data, isFetching };
}
