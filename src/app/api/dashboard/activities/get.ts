import { apiException, httpClient } from '../../../services/httpClient';

export interface FetchDashboardActivitiesPayload {
  periodStart?: string;
  periodEnd?: string;
}

export async function fetchDashboardActivities({
  periodEnd,
  periodStart,
}: FetchDashboardActivitiesPayload) {
  try {
    const { data } = await httpClient.get<number>('/dashboard/activities', {
      params: { periodStart, periodEnd },
    });

    return data;
  } catch (error) {
    throw apiException(error);
  }
}
