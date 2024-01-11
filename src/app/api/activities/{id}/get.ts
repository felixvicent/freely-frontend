import { Activity } from '../../../entities/Activity';
import { apiException, httpClient } from '../../../services/httpClient';

interface FetchActivityDetailsPayload {
  activityId: string;
}

export async function fetchActivityDetails(
  payload: FetchActivityDetailsPayload,
) {
  try {
    const { data } = await httpClient.get<Activity>(
      `/activities/${payload.activityId}`,
    );

    return data;
  } catch (error) {
    throw apiException(error);
  }
}
