import { useMutation } from 'react-query';

import { fetchCreateUser } from '../../../api/users/post';

export function useFetchCreateUser() {
  const { data, mutateAsync, isLoading } = useMutation({
    mutationFn: fetchCreateUser,
  });

  return { data, mutateAsync, isLoading };
}
