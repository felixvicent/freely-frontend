import { Activity } from "../../../entities/Activity";
import { httpClient } from "../../../services/httpClient";
import { ActivityForm } from "../../dtos/ActivityForm";

export interface FetchUpdateActivityPayload {
  path: {
    id: string;
  };
  body: ActivityForm;
}

export async function fetchUpdateActivity({
  path,
  body,
}: FetchUpdateActivityPayload) {
  return await httpClient.put<Activity>(`/activities/${path.id}`, body);
}
