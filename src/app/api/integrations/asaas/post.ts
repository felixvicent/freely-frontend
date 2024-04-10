import { UserProperty } from '../../../entities/UserProperty';
import { httpClient } from '../../../services/httpClient';

export interface FetchSaveIntegrationAsaasPayload {
  body: {
    apiKey: string;
  };
}

export async function fetchSaveIntegrationAsaas({
  body,
}: FetchSaveIntegrationAsaasPayload) {
  const { data } = await httpClient.post<UserProperty>(
    '/integrations/asaas',
    body,
  );

  return data;
}
