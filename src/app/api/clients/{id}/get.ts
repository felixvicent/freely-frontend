import { ClientPage } from '../../../entities/ClientPage';
import { apiException, httpClient } from '../../../services/httpClient';

interface FetchClientDetailsPayload {
  path: {
    clientId: string;
  };
}

export async function fetchClientDetails({ path }: FetchClientDetailsPayload) {
  try {
    const { data } = await httpClient.get<ClientPage>(
      `/clients/${path.clientId}`,
    );

    return data;
  } catch (error) {
    throw apiException(error);
  }
}
