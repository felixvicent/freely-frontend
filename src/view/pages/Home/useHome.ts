import { useFetchDashboard } from "../../../app/hooks/api/dashboard/useFetchDashboard";

export function useHome() {
  const { isFetching, dashboard } = useFetchDashboard();

  return { dashboard, isFetching };
}
