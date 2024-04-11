import { Project } from '../../entities/Project';
import { httpClient } from '../../services/httpClient';

export interface FetchCreatePaymentPayload {
  path: {
    projectId: string;
  };
}

export async function fetchCreatePayment({ path }: FetchCreatePaymentPayload) {
  const { data } = await httpClient.post<Project>(
    `/payments/${path.projectId}`,
  );

  return data;
}
