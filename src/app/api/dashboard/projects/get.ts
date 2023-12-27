import { apiException, httpClient } from '../../../services/httpClient';

export interface FetchDashboardProjectsPayload {
  periodStart?: string;
  periodEnd?: string;
}

export async function fetchDashboardProjects({
  periodEnd,
  periodStart,
}: FetchDashboardProjectsPayload) {
  try {
    const { data } = await httpClient.get<number>('/dashboard/projects', {
      params: { periodStart, periodEnd },
    });

    return data;
  } catch (error) {
    throw apiException(error);
  }
}
