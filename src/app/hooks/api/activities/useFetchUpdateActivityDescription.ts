import { useMutation } from 'react-query';

import { fetchUpdateActivityDescription } from '../../../api/activities/{id}/description/{id}/put';

export function useFetchUpdateActivityDescription() {
  const { data, mutateAsync, isLoading } = useMutation({
    mutationFn: fetchUpdateActivityDescription,
  });

  return { data, mutateAsync, isLoading };
}
