import { useMutation } from "react-query";
import { fetchCreateClient } from "../../../api/clients/post";

export function useFetchCreateClient() {
  const { data, mutateAsync, isLoading } = useMutation({
    mutationFn: fetchCreateClient,
  });

  return { data, mutateAsync, isLoading };
}
