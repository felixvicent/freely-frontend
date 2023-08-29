import { httpClient } from "../../services/httpClient";

export async function fetchListClients() {
  const { data } = await httpClient.get("/clients");

  return data;
}
