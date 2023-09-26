import { useDrop } from "react-dnd";
import { useFetchWaitingActivities } from "../../../../app/hooks/api/activities/useFetchWaitingActivities";
import { ActivityStatus } from "../../../../app/entities/AcitivtyStatus";

export function useWaitingActivitiesDrop() {
  const { waitingActivities, isFetching } = useFetchWaitingActivities();

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "box",
    drop: () => ({ status: ActivityStatus.WAITING }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;

  return { waitingActivities, isLoading: isFetching, drop, isActive };
}
