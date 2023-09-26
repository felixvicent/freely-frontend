import { useQuery } from "react-query";
import { fetchActivities } from "../../../api/activities/get";
import { ActivityStatus } from "../../../entities/AcitivtyStatus";

export function useFetchDoneActivities() {
  const { data, isFetching } = useQuery({
    queryKey: ["done-activities"],
    queryFn: () => fetchActivities({ params: { status: ActivityStatus.DONE } }),
  });

  return { doneActivities: data, isFetching };
}
