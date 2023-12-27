import { apiException, httpClient } from '../../../services/httpClient';

export interface FetchDashboardRevenuePayload {
  periodStart: string;
  periodEnd: string;
}

export async function fetchDashboardRevenue({
  periodEnd,
  periodStart,
}: FetchDashboardRevenuePayload) {
  try {
    const { data } = await httpClient.get<number>('/dashboard/revenue', {
      params: { periodStart, periodEnd },
    });

    return data;
  } catch (error) {
    throw apiException(error);
  }
}
