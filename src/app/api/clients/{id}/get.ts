import { ClientPage } from "../../../entities/ClientPage";
import { httpClient } from "../../../services/httpClient";

interface FetchClientDetailsPayload {
  path: {
    clientId: string;
  };
}

export async function fetchClientDetails({ path }: FetchClientDetailsPayload) {
  const { data } = await httpClient.get<ClientPage>(
    `/clients/${path.clientId}`
  );

  return data;
}
