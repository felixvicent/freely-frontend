import { Dashboard } from "../../entities/Dashboard";
import { httpClient } from "../../services/httpClient";

export async function fetchDashboard() {
  const { data } = await httpClient.get<Dashboard>("/dashboard");

  return data;
}
