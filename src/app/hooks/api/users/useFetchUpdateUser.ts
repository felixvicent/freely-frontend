import { useMutation } from 'react-query';

import { fetchUpdateUser } from '../../../api/users/{id}/put';

export function useFetchUpdateUser() {
  const { data, mutateAsync, isLoading } = useMutation({
    mutationFn: fetchUpdateUser,
  });

  return { data, mutateAsync, isLoading };
}
