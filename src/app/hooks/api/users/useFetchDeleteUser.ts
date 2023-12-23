import { useMutation } from 'react-query';

import { fetchDeleteUser } from '../../../api/users/{id}/delete';

export function useFetchDeleteUser() {
  const { data, mutateAsync, isLoading } = useMutation({
    mutationFn: fetchDeleteUser,
  });

  return { data, mutateAsync, isLoading };
}
