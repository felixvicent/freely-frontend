import { useQuery } from 'react-query';

import { fetchActivities } from '../../../api/activities/get';
import { ActivityStatus } from '../../../entities/AcitivtyStatus';

export function useFetchDoneActivities(projectId: string) {
  const { data, isFetching } = useQuery({
    queryKey: ['done-activities'],
    queryFn: () => fetchActivities({ status: ActivityStatus.DONE, projectId }),
  });

  return { doneActivities: data, isFetching };
}
