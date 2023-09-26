import { useQuery } from "react-query";
import { fetchActivities } from "../../../api/activities/get";
import { ActivityStatus } from "../../../entities/AcitivtyStatus";

export function useFetchProgressActivities() {
  const { data, isFetching } = useQuery({
    queryKey: ["progress-activities"],
    queryFn: () =>
      fetchActivities({ params: { status: ActivityStatus.PROGRESS } }),
  });

  return { progressActivities: data, isFetching };
}
