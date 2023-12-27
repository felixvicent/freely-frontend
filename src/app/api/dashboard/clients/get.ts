import { apiException, httpClient } from '../../../services/httpClient';

export interface FetchDashboardClientsPayload {
  periodStart: string;
  periodEnd: string;
}

export async function fetchDashboardClients({
  periodEnd,
  periodStart,
}: FetchDashboardClientsPayload) {
  try {
    const { data } = await httpClient.get<number>('/dashboard/clients', {
      params: { periodStart, periodEnd },
    });

    return data;
  } catch (error) {
    throw apiException(error);
  }
}
