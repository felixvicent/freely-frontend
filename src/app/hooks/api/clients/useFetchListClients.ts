import { useQuery } from "react-query";
import { ClientParams, fetchListClients } from "../../../api/clients/get";

export function useFetchListClients(clientParams: ClientParams) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["clients"],
    queryFn: () => fetchListClients({ params: clientParams }),
  });

  return { clients: data, isFetching, refetch };
}
