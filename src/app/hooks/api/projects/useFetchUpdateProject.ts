import { useMutation } from "react-query";
import { fetchUpdateProject } from "../../../api/projects/{id}/put";

export function useFetchUpdateProject() {
  const { data, mutateAsync, isLoading } = useMutation({
    mutationFn: fetchUpdateProject,
  });

  return { data, mutateAsync, isLoading };
}
