import { useMutation } from 'react-query';

import { fetchDeleteCollaborator } from '../../../api/collaborators/{id}/delete';

export function useFetchDeleteCollaborator() {
  const { data, mutateAsync, isLoading } = useMutation({
    mutationFn: fetchDeleteCollaborator,
  });

  return { data, mutateAsync, isLoading };
}
