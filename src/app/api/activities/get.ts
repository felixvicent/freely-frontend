import { ActivityStatus } from "../../entities/AcitivtyStatus";
import { Activity } from "../../entities/Activity";
import { apiException, httpClient } from "../../services/httpClient";

export interface ActivityParams {
  status: ActivityStatus;
}
interface FetchActivitiesPayload {
  params: ActivityParams;
}

export async function fetchActivities({ params }: FetchActivitiesPayload) {
  try {
    const { data } = await httpClient.get<Activity[]>("/activities", {
      params,
    });

    return data;
  } catch (error) {
    throw apiException(error)
  }
}
