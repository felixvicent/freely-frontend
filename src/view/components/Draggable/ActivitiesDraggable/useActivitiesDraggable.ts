import { useState } from 'react';
import { useDrag } from 'react-dnd';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';

import { Activity } from '../../../../app/entities/Activity';
import { ActivityStatus } from '../../../../app/entities/ActivityStatus';
import { Project } from '../../../../app/entities/Project';
import { useFetchDeleteActivity } from '../../../../app/hooks/api/activities/useFetchDeleteActivity';
import { useFetchUpdateActivity } from '../../../../app/hooks/api/activities/useFetchUpdateActivities';
import { apiException } from '../../../../app/services/httpClient';
import { getQueryToInvalidate } from '../../../../app/utils/activities/getQueryToInvalidate';

interface IDropResult {
  status: ActivityStatus;
  project: Project;
}

export function useActivitiesDraggable(activity: Activity) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalActivityOpen, setIsModalActivityOpen] = useState(false);

  function handleOpenModal() {
    setIsModalActivityOpen(true);
  }

  function handleCloseModal() {
    setIsModalActivityOpen(false);
  }

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

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

  return {
    drag,
    handleDeleteActivity,
    isLoading,
    handleOpenModal,
    handleCloseModal,
    isDeleteModalOpen,
    isModalActivityOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  };
}
