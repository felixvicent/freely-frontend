import { useMutation } from 'react-query';

import { fetchUpdateProjectStatus } from '../../../api/projects/{id}/status/put';

export function useFetchUpdateProjectStatus() {
  const { data, mutateAsync, isLoading } = useMutation({
    mutationFn: fetchUpdateProjectStatus,
  });

  return { data, mutateAsync, isLoading };
}
