import { httpClient } from '../../../../../services/httpClient';

export interface FetchUpdateActivityDescriptionPayload {
  path: {
    activityId: string;
  };
  body: {
    description?: string;
  };
}

export async function fetchUpdateActivityDescription({
  path,
  body,
}: FetchUpdateActivityDescriptionPayload) {
  return httpClient.put<void>(
    `/activities/${path.activityId}/description`,
    body,
  );
}
