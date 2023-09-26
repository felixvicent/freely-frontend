import { useQuery } from "react-query";
import { fetchActivities } from "../../../api/activities/get";
import { ActivityStatus } from "../../../entities/AcitivtyStatus";

export function useFetchPendingActivities() {
  const { data, isFetching } = useQuery({
    queryKey: ["pending-activities"],
    queryFn: () =>
      fetchActivities({ params: { status: ActivityStatus.PENDING } }),
  });

  return { pendingActivities: data, isFetching };
}
