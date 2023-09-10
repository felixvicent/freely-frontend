import { useMutation } from "react-query";
import { fetchDeleteProject } from "../../../api/projects/{id}/delete";

export function useFetchDeleteProject() {
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: fetchDeleteProject,
  });

  return { mutateAsync, isLoading };
}
