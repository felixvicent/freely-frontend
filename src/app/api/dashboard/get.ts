import { Dashboard } from "../../entities/Dashboard";
import { apiException, httpClient } from "../../services/httpClient";

export async function fetchDashboard() {
  try {
    const { data } = await httpClient.get<Dashboard>("/dashboard");

    return data;
  } catch (error) {
    throw apiException(error);
  }
}
