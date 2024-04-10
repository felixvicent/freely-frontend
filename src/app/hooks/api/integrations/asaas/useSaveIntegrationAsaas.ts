import { useMutation } from 'react-query';

import { fetchSaveIntegrationAsaas } from '../../../../api/integrations/asaas/post';

export function useFetchSaveIntegrationAsaas() {
  const { data, mutateAsync, isLoading } = useMutation({
    mutationFn: fetchSaveIntegrationAsaas,
  });

  return { data, mutateAsync, isLoading };
}
