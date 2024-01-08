import { useMutation } from 'react-query';

import { fetchUpdateCollaborator } from '../../../api/collaborators/{id}/put';

export function useFetchUpdateCollaborator() {
  const { data, mutateAsync, isLoading } = useMutation({
    mutationFn: fetchUpdateCollaborator,
  });

  return { data, mutateAsync, isLoading };
}
