import { useMutation } from 'react-query';

import { fetchDeleteActivity } from '../../../api/activities/{id}/delete';

export function useFetchDeleteActivity() {
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: fetchDeleteActivity,
  });

  return { mutateAsync, isLoading };
}
