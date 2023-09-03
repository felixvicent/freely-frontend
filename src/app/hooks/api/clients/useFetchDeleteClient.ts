import { useMutation } from "react-query";
import { fetchDeleteClient } from "../../../api/clients/{id}/delete";

export function useFetchDeleteClient() {
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: fetchDeleteClient,
  });

  return { mutateAsync, isLoading };
}
