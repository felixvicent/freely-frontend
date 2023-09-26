import { useDrop } from "react-dnd";
import { useFetchPendingActivities } from "../../../../app/hooks/api/activities/useFetchPendingActivities";
import { ActivityStatus } from "../../../../app/entities/AcitivtyStatus";

export function usePendingActivitiesDrop() {
  const { pendingActivities, isFetching } = useFetchPendingActivities();

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "box",
    drop: () => ({ status: ActivityStatus.PENDING }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;

  return { pendingActivities, isLoading: isFetching, drop, isActive };
}
