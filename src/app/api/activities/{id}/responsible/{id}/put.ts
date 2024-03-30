import { httpClient } from '../../../../../services/httpClient';

export interface FetchUpdateActivityResponsiblePayload {
  path: {
    activityId: string;
  };
  body: {
    responsibleId?: string;
  };
}

export async function fetchUpdateActivityResponsible({
  path,
  body,
}: FetchUpdateActivityResponsiblePayload) {
  return httpClient.put<void>(
    `/activities/${path.activityId}/responsible`,
    body,
  );
}
