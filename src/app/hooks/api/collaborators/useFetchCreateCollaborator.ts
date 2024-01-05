import { useMutation } from 'react-query';

import { fetchCreateCollaborator } from '../../../api/collaborators/post';

export function useFetchCreateCollaborator() {
  const { data, mutateAsync, isLoading } = useMutation({
    mutationFn: fetchCreateCollaborator,
  });

  return { data, mutateAsync, isLoading };
}
