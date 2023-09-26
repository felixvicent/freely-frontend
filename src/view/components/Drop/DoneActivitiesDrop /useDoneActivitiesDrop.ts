import { useDrop } from "react-dnd";
import { useFetchDoneActivities } from "../../../../app/hooks/api/activities/useFetchDoneActivities";
import { ActivityStatus } from "../../../../app/entities/AcitivtyStatus";

export function useDoneActivitiesDrop() {
  const { doneActivities, isFetching } = useFetchDoneActivities();

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "box",
    drop: () => ({ status: ActivityStatus.DONE }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;

  return { doneActivities, isLoading: isFetching, drop, isActive };
}
