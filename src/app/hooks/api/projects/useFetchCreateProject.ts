import { useMutation } from "react-query";
import { fetchCreateProject } from "../../../api/projects/post";

export function useFetchCreateProject() {
  const { data, mutateAsync, isLoading } = useMutation({
    mutationFn: fetchCreateProject,
  });

  return { data, mutateAsync, isLoading };
}
