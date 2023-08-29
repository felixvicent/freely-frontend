import { useQuery } from "react-query";
import { fetchListClients } from "../../../api/clients/get";

export function useFetchListClients() {
  const { data, isFetching } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchListClients,
  });

  return { clients: data ?? [], isFetching };
}
