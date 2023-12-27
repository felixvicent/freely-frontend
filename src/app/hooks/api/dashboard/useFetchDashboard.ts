import { useQuery } from 'react-query';

import {
  FetchDashboardRevenuePayload,
  fetchDashboardRevenue,
} from '../../../api/dashboard/revenue/get';

export function useFetchDashboardRevenue(params: FetchDashboardRevenuePayload) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => fetchDashboardRevenue(params),
  });

  return { revenue: data, isFetching, refetch };
}
