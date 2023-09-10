import { useQuery } from "react-query";
import { ProjectParams, fetchListProjects } from "../../../api/projects/get";

export function useFetchListProjects(projectParams: ProjectParams) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["projects"],
    queryFn: () => fetchListProjects({ params: projectParams }),
  });

  return { projects: data, isFetching, refetch };
}
