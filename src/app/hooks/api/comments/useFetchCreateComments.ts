import { useMutation } from 'react-query';

import { fetchCreateComment } from '../../../api/comments/post';

export function useFetchCreateComments() {
  const { data, mutateAsync, isLoading } = useMutation({
    mutationFn: fetchCreateComment,
  });

  return { data, mutateAsync, isLoading };
}
