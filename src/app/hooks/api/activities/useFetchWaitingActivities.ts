import { useQuery } from "react-query";
import { fetchActivities } from "../../../api/activities/get";
import { ActivityStatus } from "../../../entities/AcitivtyStatus";

export function useFetchWaitingActivities() {
  const { data, isFetching } = useQuery({
    queryKey: ["waiting-activities"],
    queryFn: () =>
      fetchActivities({ params: { status: ActivityStatus.WAITING } }),
  });

  return { waitingActivities: data, isFetching };
}
