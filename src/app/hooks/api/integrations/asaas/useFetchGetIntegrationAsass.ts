import { useQuery } from 'react-query';

import { fetchGetIntegrationAsaas } from '../../../../api/integrations/asaas/get';

export function useFetchGetIntegrationAsass() {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['integration-asaas'],
    queryFn: () => fetchGetIntegrationAsaas(),
  });

  return { property: data, isFetching, refetch };
}
