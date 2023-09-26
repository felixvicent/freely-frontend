import { ActivityStatus } from "../../entities/AcitivtyStatus";
import { Activity } from "../../entities/Activity";
import { httpClient } from "../../services/httpClient";

export interface ActivityParams {
  status: ActivityStatus;
}
interface FetchActivitiesPayload {
  params: ActivityParams;
}

export async function fetchActivities({ params }: FetchActivitiesPayload) {
  const { data } = await httpClient.get<Activity[]>("/activities", {
    params,
  });

  return data;
}
