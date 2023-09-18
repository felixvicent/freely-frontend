import { useParams } from "react-router-dom";
import { useFetchClientDetails } from "../../../app/hooks/api/clients/useFetchClientDetails";

export function useClient() {
  const { clientId } = useParams();

  const { client, isFetching } = useFetchClientDetails(clientId ?? "");

  return { client, isLoading: isFetching };
}
