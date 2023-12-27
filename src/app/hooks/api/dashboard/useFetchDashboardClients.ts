import { useQuery } from 'react-query';

import {
  FetchDashboardClientsPayload,
  fetchDashboardClients,
} from '../../../api/dashboard/clients/get';

export function useFetchDashboardClients(params: FetchDashboardClientsPayload) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['dashboard', 'clients'],
    queryFn: () => fetchDashboardClients(params),
  });

  return { clients: data, isFetching, refetch };
}
