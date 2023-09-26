import { useDrag } from "react-dnd";
import { Activity } from "../../../../app/entities/Activity";
import { ActivityStatus } from "../../../../app/entities/AcitivtyStatus";
import { useFetchUpdateActivity } from "../../../../app/hooks/api/activities/useFetchUpdateActivities";
import toast from "react-hot-toast";
import { apiException } from "../../../../app/services/httpClient";
import { useQueryClient } from "react-query";

interface DropResult {
  status: ActivityStatus;
}

export function useActivitiesDraggable(activity: Activity) {
  const { mutateAsync: updateActivity } = useFetchUpdateActivity();

  const queryClient = useQueryClient();

  function reloadNecessaryList(from: ActivityStatus, to: ActivityStatus) {
    if (from === ActivityStatus.PENDING || to === ActivityStatus.PENDING) {
      queryClient.invalidateQueries({ queryKey: ["pending-activities"] });
    }
    if (from === ActivityStatus.WAITING || to === ActivityStatus.WAITING) {
      queryClient.invalidateQueries({ queryKey: ["waiting-activities"] });
    }
    if (from === ActivityStatus.PROGRESS || to === ActivityStatus.PROGRESS) {
      queryClient.invalidateQueries({ queryKey: ["progress-activities"] });
    }
    if (from === ActivityStatus.DONE || to === ActivityStatus.DONE) {
      queryClient.invalidateQueries({ queryKey: ["done-activities"] });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, drag] = useDrag(
    () => ({
      type: "box",
      item: activity,
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult<DropResult>();
        if (item && dropResult) {
          updateActivity({
            path: { id: item.id },
            body: {
              projectId: item.project.id,
              title: item.title,
              status: dropResult.status,
            },
          })
            .then(() => {
              reloadNecessaryList(
                ActivityStatus[item.status as keyof typeof ActivityStatus],
                dropResult.status
              );
            })
            .catch((error) => {
              toast.error(apiException(error).message);
            });
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }),
    [activity]
  );

  return { drag };
}
