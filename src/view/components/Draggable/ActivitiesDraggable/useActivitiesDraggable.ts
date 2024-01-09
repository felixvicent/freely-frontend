import { useDrag } from 'react-dnd';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';

import { ActivityStatus } from '../../../../app/entities/AcitivtyStatus';
import { Activity } from '../../../../app/entities/Activity';
import { Project } from '../../../../app/entities/Project';
import { useFetchDeleteActivity } from '../../../../app/hooks/api/activities/useFetchDeleteActivity';
import { useFetchUpdateActivity } from '../../../../app/hooks/api/activities/useFetchUpdateActivities';
import { apiException } from '../../../../app/services/httpClient';

interface IDropResult {
  status: ActivityStatus;
  project: Project;
}

export function useActivitiesDraggable(activity: Activity) {
  const { mutateAsync: updateActivity } = useFetchUpdateActivity();
  const { mutateAsync: deleteActivity, isLoading } = useFetchDeleteActivity();

  const queryClient = useQueryClient();

  async function handleDeleteActivity(activityId: string) {
    await deleteActivity({ path: { id: activityId } });
  }

  function getQueryToInvalidate(status: ActivityStatus) {
    switch (status) {
      case ActivityStatus.PENDING:
        return 'pending-activities';
      case ActivityStatus.DONE:
        return 'done-activities';
      case ActivityStatus.PROGRESS:
        return 'progress-activities';
      case ActivityStatus.WAITING:
        return 'waiting-activities';
      default:
        return '';
    }
  }

  const [_, drag] = useDrag(
    () => ({
      type: 'box',
      item: activity,
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult<IDropResult>();
        if (item && dropResult) {
          updateActivity({
            path: { id: item.id },
            body: {
              projectId: activity.project.id,
              title: item.title,
              status: dropResult.status,
              estimatedDate: '',
            },
          })
            .then(() => {
              queryClient.invalidateQueries({
                queryKey: [
                  getQueryToInvalidate(
                    ActivityStatus[
                      activity.status as keyof typeof ActivityStatus
                    ],
                  ),
                ],
              });
              queryClient.invalidateQueries({
                queryKey: [
                  getQueryToInvalidate(
                    ActivityStatus[
                      dropResult.status as keyof typeof ActivityStatus
                    ],
                  ),
                ],
              });
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
    [activity],
  );

  return { drag, handleDeleteActivity, isLoading };
}
