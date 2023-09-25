import { useQuery } from "react-query";
import { fetchDashboard } from "../../../api/dashboard/get";

export function useFetchDashboard() {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => fetchDashboard(),
  });

  return { dashboard: data, isFetching, refetch };
}
