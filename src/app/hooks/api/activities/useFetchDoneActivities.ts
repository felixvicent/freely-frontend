import { useQuery } from 'react-query';

import { fetchActivities } from '../../../api/activities/get';
import { ActivityStatus } from '../../../entities/ActivityStatus';

export function useFetchDoneActivities(
  projectId?: string,
  collaboratorsIds?: string[],
) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['done-activities'],
    queryFn: () =>
      fetchActivities({
        status: ActivityStatus.DONE,
        projectId: projectId ?? '',
        collaboratorsIds,
      }),
  });

  return { doneActivities: data, isFetching, refetch };
}
