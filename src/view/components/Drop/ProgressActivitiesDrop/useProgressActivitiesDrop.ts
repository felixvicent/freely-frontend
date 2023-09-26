import { useDrop } from "react-dnd";
import { useFetchProgressActivities } from "../../../../app/hooks/api/activities/useFetchProgressActivities";
import { ActivityStatus } from "../../../../app/entities/AcitivtyStatus";

export function useProgressActivitiesDrop() {
  const { progressActivities, isFetching } = useFetchProgressActivities();

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "box",
    drop: () => ({ status: ActivityStatus.PROGRESS }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;

  return { progressActivities, isLoading: isFetching, drop, isActive };
}
