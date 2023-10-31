import { useMutation } from 'react-query';

import { fetchToggleUserActive } from '../../../api/users/{id}/toggleActive/put';

export function useFetchToggleUserActive() {
  const { data, mutateAsync, isLoading } = useMutation({
    mutationFn: fetchToggleUserActive,
  });

  return { data, mutateAsync, isLoading };
}
