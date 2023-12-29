import { Activity } from '../../entities/Activity';
import { httpClient } from '../../services/httpClient';
import { ActivityForm } from '../dtos/ActivityForm';

export interface FetchCreateActivityPayload {
  body: ActivityForm;
}

export async function fetchCreateActivity({
  body,
}: FetchCreateActivityPayload) {
  const { data } = await httpClient.post<Activity>('/activities', body);

  return data;
}
