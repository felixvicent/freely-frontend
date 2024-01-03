import { useQuery } from 'react-query';

import { fetchClientDetails } from '../../../api/clients/{id}/get';

export function useFetchClientDetails(clientId: string) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['client-details'],
    queryFn: () => fetchClientDetails({ path: { clientId } }),
  });

  return { client: data, isFetching, refetch };
}
