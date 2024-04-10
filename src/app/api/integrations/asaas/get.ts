import { UserProperty } from '../../../entities/UserProperty';
import { httpClient } from '../../../services/httpClient';

export async function fetchGetIntegrationAsaas() {
  const { data } = await httpClient.get<UserProperty>('/integrations/asaas');

  return data;
}
