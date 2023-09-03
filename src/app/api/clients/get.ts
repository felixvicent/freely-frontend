import { Client } from "../../entities/Client";
import { Page } from "../../entities/Page";
import { httpClient } from "../../services/httpClient";

export interface ClientParams {
  page?: number;
  size?: number;
  sort?: string;
  query?: string;
}
interface FetchListClientsPayload {
  params: ClientParams;
}

export async function fetchListClients({ params }: FetchListClientsPayload) {
  const { data } = await httpClient.get<Page<Client>>("/clients", {
    params,
  });

  return data;
}
