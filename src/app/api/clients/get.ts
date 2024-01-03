import { ClientList } from '../../entities/ClientList';
import { Page } from '../../entities/Page';
import { apiException, httpClient } from '../../services/httpClient';

export interface ClientParams {
  page?: number;
  size?: number;
  sort?: string;
  clientIds?: string[];
}
interface FetchListClientsPayload {
  params: ClientParams;
}

export async function fetchListClients({ params }: FetchListClientsPayload) {
  try {
    const { data } = await httpClient.get<Page<ClientList>>('/clients', {
      params,
    });

    return data;
  } catch (error) {
    throw apiException(error);
  }
}
