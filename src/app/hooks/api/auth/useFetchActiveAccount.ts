import { useMutation } from 'react-query';

import { fetchActiveAccount } from '../../../api/auth/active-account/post';

export function useFetchActiveAccount() {
  const { data, mutateAsync, isLoading } = useMutation({
    mutationFn: fetchActiveAccount,
  });

  return { data, mutateAsync, isLoading };
}
