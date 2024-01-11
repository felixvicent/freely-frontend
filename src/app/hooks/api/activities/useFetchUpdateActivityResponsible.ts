import { useMutation } from 'react-query';

import { fetchUpdateActivityResponsible } from '../../../api/activities/{id}/responsible/{id}/put';

export function useFetchUpdateActivityResponsible() {
  const { data, mutateAsync, isLoading } = useMutation({
    mutationFn: fetchUpdateActivityResponsible,
  });

  return { data, mutateAsync, isLoading };
}
