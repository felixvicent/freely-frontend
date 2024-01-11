import { Activity } from '../../entities/Activity';
import { ActivityStatus } from '../../entities/ActivityStatus';
import { apiException, httpClient } from '../../services/httpClient';

interface FetchActivitiesPayload {
  status: ActivityStatus;
  projectId: string;
  collaboratorsIds?: string[];
}

export async function fetchActivities(params: FetchActivitiesPayload) {
  try {
    const { data } = await httpClient.get<Activity[]>('/activities', {
      params,
    });

    return data;
  } catch (error) {
    throw apiException(error);
  }
}
