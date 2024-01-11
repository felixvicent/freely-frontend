import { useMutation } from 'react-query';

import { fetchUpdateActivity } from '../../../api/activities/{id}/put';

export function useFetchUpdateActivity() {
  const { data, mutateAsync, isLoading } = useMutation({
    mutationFn: fetchUpdateActivity,
  });

  return { data, mutateAsync, isLoading };
}
