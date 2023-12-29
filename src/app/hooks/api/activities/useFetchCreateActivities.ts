import { useMutation } from 'react-query';

import { fetchCreateActivity } from '../../../api/activities/post';

export function useFetchCreateActivities() {
  const { data, mutateAsync, isLoading } = useMutation({
    mutationFn: fetchCreateActivity,
  });

  return { data, mutateAsync, isLoading };
}
