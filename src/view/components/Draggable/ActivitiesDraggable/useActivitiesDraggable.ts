import { useDrag } from 'react-dnd';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';

import { ActivityStatus } from '../../../../app/entities/AcitivtyStatus';
import { Activity } from '../../../../app/entities/Activity';
import { useFetchDeleteActivity } from '../../../../app/hooks/api/activities/useFetchDeleteActivity';
import { useFetchUpdateActivity } from '../../../../app/hooks/api/activities/useFetchUpdateActivities';
import { apiException } from '../../../../app/services/httpClient';

interface IDropResult {
  status: ActivityStatus;
}

export function useActivitiesDraggable(activity: Activity, projectId: string) {
  const { mutateAsync: updateActivity } = useFetchUpdateActivity();
  const { mutateAsync: deleteActivity, isLoading } = useFetchDeleteActivity();

  const queryClient = useQueryClient();

  async function handleDeleteActivity(activityId: string) {
    await deleteActivity({ path: { id: activityId } });
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
              projectId,
              title: item.title,
              status: dropResult.status,
            },
          })
            .then(() => {
              queryClient.invalidateQueries({ queryKey: ['project-details'] });
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
