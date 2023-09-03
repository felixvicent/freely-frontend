import { useMutation } from "react-query";
import { fetchUpdateClient } from "../../../api/clients/{id}/put";

export function useFetchUpdateClient() {
  const { data, mutateAsync, isLoading } = useMutation({
    mutationFn: fetchUpdateClient,
  });

  return { data, mutateAsync, isLoading };
}
